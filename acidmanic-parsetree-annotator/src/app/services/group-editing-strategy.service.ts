import {Injectable} from "@angular/core";
import {TokenSelectionModel} from "../models/token-selection.model";
import {TokenGroupModel} from "../models/token-group.model";
import {TokenProcessorService} from "./token-processor.service";
import {TokenGroupNodeComponent} from "../components/flatten-token-tree/token-group-node/token-group-node.component";
import {TokenModel} from "../models/token.model";


@Injectable({
  providedIn: 'root'
})
export class GroupEditingStrategyService {


  constructor(private processor: TokenProcessorService) {
  }

  public canTokenBeSelected(selection: TokenSelectionModel,
                            root: TokenGroupModel,
                            tokenIndex: number,
                            groupId: number): boolean {

    if (selection.selectionGroupId != groupId) return true;

    if (selection.selectedTokenIndexes.length == 0) return true;

    if (tokenIndex == selection.selectedTokenIndexes[0] - 1) return true;

    if (tokenIndex == selection.selectedTokenIndexes[selection.selectedTokenIndexes.length - 1] + 1) return true;


    return false;
  }

  public canTokenBeClicked(selection: TokenSelectionModel,
                           root: TokenGroupModel,
                           tokenIndex: number,
                           groupId: number): boolean {

    if (this.canTokenBeSelected(selection, root, tokenIndex, groupId)) return true;

    if (selection.selectionGroupId == groupId) {
      for (const selectedId of selection.selectedTokenIndexes) {

        if (tokenIndex == selectedId) {
          return true;
        }
      }
    }

    return false;
  }

  private isRoot(group:TokenGroupModel):boolean{

    if(!group.parent || (group.root && group.root.id==group.id) ) return true;

    return false;
  }


  public canTokensBeDeleted(group:TokenGroupModel,selection: TokenSelectionModel,
                            root: TokenGroupModel): boolean {

    // if any tokens are selected, they dont belong to this group
    if(group.id!=selection.selectionGroupId) return false;

    // root's tokens are not deletable
    if(this.isRoot(group)) return false;

    let map = this.processor.mapTokenGroup(root);

    if (map.groupsById.has(selection.selectionGroupId)) {

      let selectedGroup = map.groupsById.get(selection.selectionGroupId)!;
      // implies a whole group delete not just tokens
      if (selection.selectedTokenIndexes.length == selectedGroup.tokens.length) return false;

      for (const tokenIndex of selection.selectedTokenIndexes) {

        if (this.isTokenUsedInChildren(selectedGroup, tokenIndex)) {

          return false;
        }
      }
      // if non of tokens are used in lower groups, it's ok to be deleted
      return true;
    }

    return false;
  }

  private isTokenUsedInChildren(node: TokenGroupModel, tokenIndex: number): boolean {

    for (const child of node.children) {

      for (const childToken of child.tokens) {

        if (childToken.index == tokenIndex) {
          return true;
        }
      }
    }

    return false;
  }

  public canSubGroupBeDeleted(group:TokenGroupModel, selection: TokenSelectionModel,
                              root: TokenGroupModel): boolean {
    // unselected groups can not be deleted
    if(group.id!=selection.selectionGroupId) return false;
    // root can not be deleted
    if(this.isRoot(group)) return false;

    let map = this.processor.mapTokenGroup(root);

    if (map.groupsById.has(selection.selectionGroupId)) {

      let selectedGroup = map.groupsById.get(selection.selectionGroupId)!;

      return (selection.selectedTokenIndexes.length == selectedGroup.tokens.length);
    }

    return false;
  }

  public canCreateSubGroup(group:TokenGroupModel,selection: TokenSelectionModel,
                           root: TokenGroupModel): boolean {
    // unselected groups can not create subgroups
    if(group.id!=selection.selectionGroupId) return false;

    let map = this.processor.mapTokenGroup(root);

    if (map.groupsById.has(selection.selectionGroupId)) {

      let selectedGroup = map.groupsById.get(selection.selectionGroupId)!;

      for (const tokenIndex of selection.selectedTokenIndexes) {

        if (this.processor.isTokenPassedToAnyChildren(selectedGroup, tokenIndex)) {

          return false;
        }
      }
      return true;
    }

    return false;
  }

}
