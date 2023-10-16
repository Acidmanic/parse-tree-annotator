import {Injectable} from "@angular/core";
import {TokenSelectionModel} from "../models/token-selection.model";
import {TokenGroupModel} from "../models/token-group.model";
import {ResultModel} from "../models/result.model";
import {TokenSelectionCacheModel} from "../models/token-selection-cache.model";
import {GroupSelectionStateModel} from "../models/group-selection-state.model";
import {TokenSelectionStateModel} from "../models/token-selection-state.model";
import {TokenModel} from "../models/token.model";
import {GroupEditingStrategyService} from "./group-editing-strategy.service";
import {TokenSelectionMetadataModel} from "../models/token-selection-metadata.model";


@Injectable({
  providedIn: 'root'
})
export class TokenSelectionProcessorService {


  constructor(private strategy: GroupEditingStrategyService) {
  }


  public getMetaData(root: TokenGroupModel, selection: TokenSelectionModel): TokenSelectionMetadataModel {

    let meta = new TokenSelectionMetadataModel();

    let min = 100000;
    let max = -100000;

    for (const selectedId of selection.selectedTokenIndexes) {

      if (min > selectedId) {
        min = selectedId;
      }
      if (max < selectedId) {
        max = selectedId;
      }

      meta.maxSelectedIndex = max;
      meta.minSelectedIndex = min;

      meta.selectedSet.add(selectedId);
    }

    if (selection.selectedTokenIndexes.length) {

      meta.selectablesSet.add(max);

      if (max != min) {
        meta.selectablesSet.add(min);
      }
    }

    if (selection.selectedTokenIndexes.length) {

      let prev = meta.minSelectedIndex - 1;
      let next = meta.maxSelectedIndex + 1;

      if (prev >= 0) {
        meta.selectablesSet.add(prev);
      }

      if (prev != next) {
        meta.selectablesSet.add(next);
      }

    }

    meta.leaves = this.getLeaves(root);

    for (const leaf of meta.leaves) {

      if (leaf.tokens.length == 1) {

        meta.singularLeaves.set(leaf.tokens[0].index, leaf);
      }
    }

    for (const selectedId of selection.selectedTokenIndexes) {

      if (meta.singularLeaves.has(selectedId)) {

        meta.singularLeafedTokensSelected = true;
      } else {
        meta.noneSingularLeafedTokensSelected = true;
      }
    }

    meta.treeIsComplete = root.tokens.length == meta.singularLeaves.size;

    let selectedGroup = this.selectedSubGroup(root, selection);

    if (selectedGroup.success) {

      meta.wholeGroupIsSelected = selectedGroup.value!.tokens.length == selection.selectedTokenIndexes.length;
    }

    return meta;
  }


  public getLeaves(root: TokenGroupModel): TokenGroupModel[] {

    let leaves: TokenGroupModel[] = [];

    this.addLeaves(root, leaves);

    return leaves;
  }

  private addLeaves(node: TokenGroupModel, leaves: TokenGroupModel[]): void {

    if (node.children.length > 0) {

      for (const child of node.children) {

        this.addLeaves(child, leaves);
      }
    } else {

      leaves.push(node);
    }

  }


  public selectedSubGroup(node: TokenGroupModel, selection: TokenSelectionModel): ResultModel<TokenGroupModel> {

    if (selection.selectionGroupId == node.id) {
      return {success: true, value: node};
    }

    for (const child of node.children) {

      let foundSelected = this.selectedSubGroup(child, selection);
      if (foundSelected.success) {

        return {success: true, value: foundSelected.value};
      }

    }

    return {success: false};
  }


  public processSelectionState(root: TokenGroupModel, selection: TokenSelectionModel): TokenSelectionCacheModel {

    let cached = new TokenSelectionCacheModel();

    this.indexSelectionStates(root, selection, cached);

    return cached;
  }


  private indexSelectionStates(node: TokenGroupModel, selection: TokenSelectionModel, state: TokenSelectionCacheModel) {

    if (!state.groupSelectionStateByGroupId.has(node.id)) {

      let nodeState = new GroupSelectionStateModel();

      nodeState.isLeaf = node.children.length == 0;

      nodeState.isSingularLeaf = nodeState.isLeaf && node.tokens.length == 1;

      nodeState.isHighlighted = selection.highlightedGroups.has(node.id);

      if(selection.selectionGroupId==node.id){

        state.selectedGroup = node;
      }

      if (nodeState.isLeaf) {
        state.leaves.set(node.id, node);
        if (nodeState.isSingularLeaf) {
          state.singularLeaves.set(node.id, node);
        }
      }

      this.indexTokensSelectionState(node, selection, state);

      nodeState.isSelected = true;

      for (const token of node.tokens) {

        if (!state.selectedSet.has(node.id,token.index)) {
          nodeState.isSelected = false;
          break;
        }
      }

      for (const child of node.children) {

        this.indexSelectionStates(child, selection, state);
      }

      state.groupSelectionStateByGroupId.set(node.id, nodeState);

    }
  }

  private indexTokensSelectionState(node: TokenGroupModel, selection: TokenSelectionModel, state: TokenSelectionCacheModel) {

    for (const token of node.tokens) {

      if (!state.tokenSelectionStateByTokenIndex.has(node.id, token.index)) {

        let tokenState = new TokenSelectionStateModel();

        tokenState.isSelected = this.isTokenSelected(token, node, selection);

        tokenState.isSelectable = this.strategy.canTokenBeSelected(selection, node.root!, token.index, node.id);

        tokenState.isClickable = this.strategy.canTokenBeClicked(selection, node.root!, token.index, node.id);

        if (tokenState.isSelectable) {

          state.selectableSet.add(node.id, token.index);
        }

        if(tokenState.isSelected){

          state.selectedSet.add(node.id,token.index);
        }

        if(tokenState.isClickable){
          state.clickableSet.add(node.id,token.index)
        }

        state.tokenSelectionStateByTokenIndex.set(node.id, token.index, tokenState);
      }
    }


  }

  private isTokenSelected(token: TokenModel, node: TokenGroupModel, selection: TokenSelectionModel): boolean {

    if (node.id != selection.selectionGroupId) {
      return false;
    }

    for (const index of selection.selectedTokenIndexes) {

      if (index == token.index) {
        return true;
      }
    }

    return false;
  }


  public selectionSignature(selection: TokenSelectionModel): string {

    let hash = '{' + selection.selectionGroupId + '[';

    let sep = '';

    for (const index of selection.selectedTokenIndexes) {
      hash += sep + index;
      sep = ',';
    }

    hash += '(';
    sep = '';
    for (const groupId of selection.highlightedGroups.keys()) {
      hash += sep + groupId + ':' + selection.highlightedGroups.get(groupId)!;
      sep = ',';
    }
    hash += ")}";
    return hash;
  }


  public clone(selection:TokenSelectionModel):TokenSelectionModel{

    let dst = new TokenSelectionModel();

    this.cloneInto(selection,dst);

    return dst;
  }

  public cloneInto(src:TokenSelectionModel,dst:TokenSelectionModel):void{

    dst.selectedTokenIndexes = src.selectedTokenIndexes;

    dst.selectionGroupId = src.selectionGroupId;

    dst.highlightedGroups = src.highlightedGroups;

  }
}
