import {Injectable} from "@angular/core";
import {TokenModel} from "../models/token.model";
import {TokenGroupModel} from "../models/token-group.model";
import {ResultModel} from "../models/result.model";
import {TokenGroupComponent} from "../components/token-group/token-group.component";
import {TokenGroupMapModel} from "../models/token-group-map.model";


@Injectable({
  providedIn: 'root'
})
export class TokenProcessorService {

  private static nextGroupId = 0;

  public toTopGroup(tokens: TokenModel[]): TokenGroupModel {

    return this.toSubGroup(tokens, 'TOP');
  }

  public toSubGroup(tokens: TokenModel[], tag: string): TokenGroupModel {

    let group = new TokenGroupModel();

    group.tag = tag;
    group.tokens = tokens;
    group.children = [];

    return group;
  }


  public generateGroupId(): number {

    let id = TokenProcessorService.nextGroupId;

    TokenProcessorService.nextGroupId++;

    return id;
  }

  public subGroup(group: TokenGroupModel, indexes: number[], tag: string): ResultModel<TokenGroupModel> {

    let lastIndex = indexes[0];

    for (let i = 1; i < indexes.length; i++) {
      let index = indexes[i];

      if (index != lastIndex + 1) {
        return {success: false};
      }

      lastIndex = index;
    }

    for (const index of indexes) {

      for (const child of group.children) {

        for (const token of child.tokens) {
          if (token.index == index) {
            return {success: false};
          }
        }
      }
    }

    let subGroup = new TokenGroupModel();

    subGroup.id = this.generateGroupId();

    subGroup.tag = tag;

    for (const index of indexes) {

      let token = this.findByIndex(group, index);

      if (token.success) {
        subGroup.tokens.push(token.value!);
      }
    }

    group.children.push(subGroup);

    subGroup.parent = group;
    subGroup.root = group.root;

    this.updateTokenIds(group.root!);
    this.sortDescendants(group.root!);


    return {success: true, value: subGroup};
  }

  public findByIndex(group: TokenGroupModel, index: number): ResultModel<TokenModel> {

    for (const token of group.tokens) {

      if (token.index == index) {

        return {success: true, value: token};
      }
    }
    return {success: false};
  }


  public updateTokenIds(root: TokenGroupModel): void {

    root.firstTokenId = this.firstTokenId(root);

    for (const child of root.children) {

      this.updateTokenIds(child);

    }
  }


  public sortChildren(node: TokenGroupModel) {

    node.children.sort((a, b) => a.firstTokenId - b.firstTokenId);

  }

  public sortDescendants(node: TokenGroupModel) {

    this.sortChildren(node);

    for (const child of node.children) {

      this.sortDescendants(child);
    }

  }

  public firstTokenId(node: TokenGroupModel): number {

    let min = 1000000000;

    for (const token of node.tokens) {

      if (token.index < min) {
        min = token.index;
      }

    }

    return min;
  }

  public deleteSubGroup(parent: TokenGroupModel, selectedGroup: TokenGroupModel): boolean {

    let index = parent.children.indexOf(selectedGroup);

    if (index != -1) {

      parent.children.splice(index, 1);

      return true;

    }

    return false;
  }


  public cloneToken(token: TokenModel): TokenModel {

    let clone = new TokenModel();

    clone.index = token.index;
    clone.text = token.text;

    return clone;
  }

  public cloneTokenCached(token: TokenModel, map: Map<number, TokenModel>): TokenModel {

    if (map.has(token.index)) {

      return map.get(token.index)!;
    }

    let clone = this.cloneToken(token);

    map.set(token.index, clone);

    return clone;
  }

  public cloneGroup(group: TokenGroupModel): TokenGroupModel {

    let groupsMap: Map<number, TokenGroupModel> = new Map<number, TokenGroupModel>();

    let tokensMap: Map<number, TokenModel> = new Map<number, TokenModel>();

    let root = group;

    if (group.root) {

      root = group.root;
    }

    let fullClone = this.fullClone(root, groupsMap, tokensMap);

    console.log(fullClone, groupsMap.get(group.id));

    return groupsMap.get(group.id)!;
  }

  public shallowClone(group: TokenGroupModel): TokenGroupModel {

    let clone = new TokenGroupModel();

    clone.tag = group.tag;

    clone.firstTokenId = group.firstTokenId;

    clone.root = clone;

    clone.id = group.id;

    for (const token of group.tokens) {

      clone.tokens.push(token);
    }

    return clone;
  }

  public eraseAscendants(group: TokenGroupModel, keepLayers: number) {

    this.eraseAscendantsRecursive(group, keepLayers, 0);
  }

  private eraseAscendantsRecursive(group: TokenGroupModel, keepLayers: number, currentLayer: number) {

    if (currentLayer < keepLayers) {

      for (const child of group.children) {

        this.eraseAscendantsRecursive(child, keepLayers, currentLayer + 1);
      }
    } else {
      group.children = [];
    }
  }

  private fullClone(node: TokenGroupModel, groupsMap: Map<number, TokenGroupModel>, tokensMap: Map<number, TokenModel>): TokenGroupModel {

    if (groupsMap.has(node.id)) {

      return groupsMap.get(node.id)!;
    }

    let clone = new TokenGroupModel();

    groupsMap.set(node.id, clone);

    clone.id = node.id;
    clone.tag = node.tag;
    clone.firstTokenId = node.firstTokenId;

    for (const token of node.tokens) {

      clone.tokens.push(this.cloneTokenCached(token, tokensMap));
    }

    if (node.parent) {
      clone.parent = groupsMap.get(node.parent.id);
    }

    if (node.root) {
      clone.root = groupsMap.get(node.root.id);
    }

    for (const child of node.children) {

      let childClone = this.fullClone(child, groupsMap, tokensMap);

      childClone.parent = clone;

      childClone.root = clone.root;

      clone.children.push(childClone);
    }

    return clone;
  }

  public mapTokenGroup(root: TokenGroupModel): TokenGroupMapModel {

    let map = new TokenGroupMapModel();

    this.browseInsertIntoMap(root, map);

    return map;
  }

  private browseInsertIntoMap(node: TokenGroupModel, map: TokenGroupMapModel) {

    if (!map.groupsById.has(node.id)) {

      map.groupsById.set(node.id, node);
    }

    for (const token of node.tokens) {

      if (!map.tokensByIndex.has(token.index)) {

        map.tokensByIndex.set(token.index, token);
      }
    }

    for (const child of node.children) {

      this.browseInsertIntoMap(child, map);
    }
  }


  public isTokenPassedToAnyChildren(group: TokenGroupModel, tokenIndex: number): boolean {

    for (const child of group.children) {

      let foundAlreadyUsedToken = this.findByIndex(child, tokenIndex);

      if (foundAlreadyUsedToken.success) {

        return true;
      }
    }

    return false;
  }


}
