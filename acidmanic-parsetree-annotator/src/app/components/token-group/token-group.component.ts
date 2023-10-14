import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {TokenGroupModel} from "../../models/token-group.model";
import {TokenSelectionModel} from "../../models/token-selection.model";
import {TokenModel} from "../../models/token.model";
import {Token} from "@angular/compiler";
import {TokenSelectionProcessorService} from "../../services/token-selection-processor.service";
import {TokenSelectionMetadataModel} from "../../models/token-selection-metadata.model";
import {TokenGroupPlaceholder} from "../../models/token-group.placeholder";
import {Subscription} from "rxjs";

@Component({
  selector: 'token-group',
  templateUrl: './token-group.component.html',
  styleUrls: ['./token-group.component.scss']
})
export class TokenGroupComponent implements OnInit, OnChanges, OnDestroy {


  @Input('group') group: TokenGroupModel = new TokenGroupModel();
  @Input('selection') selectionInput: TokenSelectionModel = new TokenSelectionModel();

  @Output('on-tag-clicked') onTagClicked:EventEmitter<TokenGroupModel>=new EventEmitter<TokenGroupModel>();

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

    this.refresh();

  }

  ngOnChanges(changes: SimpleChanges) {

    this.refresh();
  }

  ngOnDestroy() {

  }

  private refresh(): void {


    this.selection = this.selectionSvc.getMetaData(this.group.root!, this.selectionInput);

  }

  public processPlaceholders():TokenGroupPlaceholder[]{

    let placeHolders:TokenGroupPlaceholder[]=[];

    for (let i = 0; i < this.group.tokens.length; i++) {

      let token = this.group.tokens[i];

      let ph = this.createPlaceHolderByToken(token);

      placeHolders.push(ph);

    }

    return placeHolders;

  }


  private createPlaceHolderByToken(token:TokenModel):TokenGroupPlaceholder{

    let ph = new TokenGroupPlaceholder();

    ph.text = token.text;

    for (const child of this.group.children) {

      if(child.firstTokenId==token.index){

        ph.group = child;

        ph.groupContained = true;

        break;
      }
    }

    return ph;
  }


  public selectToken(token: TokenModel): void {

    if (!this.isSelectable(token)) {

      return;
    }

    if (this.selectionInput.groupId != this.group.id) {

      this.selectionInput.selectedIds = [];

      this.selectionInput.groupId = this.group.id;
    }

    let existingIndex = this.selectionInput.selectedIds.indexOf(token.index);

    if (existingIndex > -1) {

      this.selectionInput.selectedIds.splice(existingIndex, 1);

    } else {

      this.selectionInput.selectedIds.push(token.index);
    }

    if (this.selectionInput.selectedIds.length == 0) {

      this.selectionInput.groupId = -1;
    }

    this.selection = this.selectionSvc.getMetaData(this.group.root!, this.selectionInput);
  }
}
