import {Injectable} from "@angular/core";
import {TokenSelectionMetadataModel} from "../models/token-selection-metadata.model";
import {TokenSelectionModel} from "../models/token-selection.model";
import {TokenGroupModel} from "../models/token-group.model";
import {ResultModel} from "../models/result.model";


@Injectable({
  providedIn:'root'
})
export class TokenSelectionProcessorService{


  public getMetaData(selection:TokenSelectionModel):TokenSelectionMetadataModel{

    let meta = new TokenSelectionMetadataModel();

    let min =100000;
    let max = -100000;

    for (const selectedId of selection.selectedIds) {

      if(min > selectedId){
        min = selectedId;
      }
      if(max< selectedId){
        max = selectedId;
      }

      meta.maxSelectedIndex = max;
      meta.minSelectedIndex = min;

      meta.selectedSet.add(selectedId);
    }

    if(selection.selectedIds.length){

      meta.selectablesSet.add(max);

      if(max!=min){
        meta.selectablesSet.add(min);
      }
    }

    if(selection.selectedIds.length){

      let prev = meta.minSelectedIndex -1;
      let next = meta.maxSelectedIndex +1;

      if(prev >= 0 ){
        meta.selectablesSet.add(prev);
      }

      if(prev!=next ){
        meta.selectablesSet.add(next);
      }

    }

    return meta;

  }


  public selectedSubGroup(node: TokenGroupModel, selection: TokenSelectionModel):ResultModel<TokenGroupModel> {

    if(selection.groupId == node.id){
      return {success:true,value:node};
    }

    for (const child of node.children) {

      let foundSelected = this.selectedSubGroup(child,selection);
      if(foundSelected.success){

        return {success:true,value:foundSelected.value};
      }

    }

    return {success:false};
  }
}
