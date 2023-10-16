import {Injectable} from "@angular/core";
import {TokenSelectionModel} from "../models/token-selection.model";
import {TokenGroupModel} from "../models/token-group.model";
import {TokenProcessorService} from "./token-processor.service";


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


  public canTokenBeDeleted(selection: TokenSelectionModel,
                           root: TokenGroupModel): boolean {

    let map = this.processor.mapTokenGroup(root);

    if (map.groupsById.has(selection.selectionGroupId)) {

      if (selection.selectedTokenIndexes.length == 1) {

        let selectedTokenIndex = selection.selectedTokenIndexes[0];

        let selectedGroup = map.groupsById.get(selection.selectionGroupId);

        let tokenFound = this.processor.findByIndex(selectedGroup!, selectedTokenIndex);

        return tokenFound.success;
      }

    }

    return false;
  }

  public canSubGroupBeDeleted(selection: TokenSelectionModel,
                              root: TokenGroupModel): boolean {

    let map = this.processor.mapTokenGroup(root);

    if (map.groupsById.has(selection.selectionGroupId)) {

      let selectedGroup = map.groupsById.get(selection.selectionGroupId)!;

      return (selection.selectedTokenIndexes.length == selectedGroup.tokens.length);
    }

    return false;
  }

  public canCreateSubGroup(selection: TokenSelectionModel,
                           root: TokenGroupModel): boolean {

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
