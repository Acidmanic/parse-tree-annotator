import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TokenGroupModel} from "../../models/token-group.model";
import {TokenSelectionModel} from "../../models/token-selection.model";
import {TokenModel} from "../../models/token.model";
import {Token} from "@angular/compiler";
import {TokenSelectionProcessorService} from "../../services/token-selection-processor.service";
import {TokenSelectionMetadataModel} from "../../models/token-selection-metadata.model";

@Component({
  selector: 'token-group',
  templateUrl: './token-group.component.html',
  styleUrls: ['./token-group.component.scss']
})
export class TokenGroupComponent implements OnInit, OnChanges {


  @Input('group') group: TokenGroupModel = new TokenGroupModel();
  @Input('selection') selectionInput: TokenSelectionModel = new TokenSelectionModel();

  public selection: TokenSelectionMetadataModel = new TokenSelectionMetadataModel();

  constructor(private selectionSvc: TokenSelectionProcessorService) {
  }


  private isSelected(token: TokenModel): boolean {

    if (this.group.id == this.selectionInput.groupId) {

      return this.selection.selectedSet.has(token.index);
    }

    return false;
  }

  private isSelectable(token: TokenModel): boolean {


    if (this.group.id == this.selectionInput.groupId) {

      return this.selection.selectablesSet.has(token.index);
    }

    return true;
  }

  public classSelectionClass(token: TokenModel): string {

    let cssClass = 'token';

    let selected = this.isSelected(token);
    let selectable = this.isSelectable(token);

    let gray = !selected && !selectable;

    if (selected) {
      cssClass += ' token-selected';
    }

    if (gray) {
      cssClass += ' token-disabled';
    }
    return cssClass;
  }


  ngOnInit() {

    this.selection = this.selectionSvc.getMetaData(this.group.root,this.selectionInput);

  }

  ngOnChanges(changes: SimpleChanges) {

    this.selection = this.selectionSvc.getMetaData(this.group.root,this.selectionInput);
  }


  public selectToken(token: TokenModel): void {


    if (!this.isSelectable(token)) {
      return;
    }

    if(this.selectionInput.groupId!=this.group.id){

      this.selectionInput.selectedIds=[];

      this.selectionInput.groupId = this.group.id;
    }


    let existingIndex = this.selectionInput.selectedIds.indexOf(token.index);

    if(existingIndex>-1){
      this.selectionInput.selectedIds.splice(existingIndex,1);
    }else{
      this.selectionInput.selectedIds.push (token.index);
    }

    if(this.selectionInput.selectedIds.length==0){
      this.selectionInput.groupId = -1;
    }
    this.selection = this.selectionSvc.getMetaData(this.group.root,this.selectionInput);
  }
}
