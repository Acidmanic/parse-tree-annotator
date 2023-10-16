import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges, OnDestroy,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {TokenGroupModel} from "../../../models/token-group.model";
import {TokenSelectionModel} from "../../../models/token-selection.model";
import {GroupElement} from "../../../models/group.element";
import {TokenModel} from "../../../models/token.model";
import {TokenSelectionProcessorService} from "../../../services/token-selection-processor.service";
import {TokenProcessorService} from "../../../services/token-processor.service";
import {TokenSelectionMetadataModel} from "../../../models/token-selection-metadata.model";

@Component({
  selector: 'token-group-node',
  templateUrl: './token-group-node.component.html',
  styleUrls: ['./token-group-node.component.scss']
})
export class TokenGroupNodeComponent implements OnChanges,AfterViewInit,OnDestroy{


  @Input('group') group: TokenGroupModel = new TokenGroupModel();
  @Input('selection') selectionInput: TokenSelectionModel = new TokenSelectionModel();
  @Output('on-tag-clicked') onTagClicked: EventEmitter<TokenGroupModel> = new EventEmitter<TokenGroupModel>();
  @Input('disable-tag-click') disableTagClick: boolean = false;

  @Output('on-circle-ready') onCircleReady:EventEmitter<GroupElement>= new EventEmitter<GroupElement>();


  @ViewChild('nodeCircle') nodeCircle:ElementRef = new ElementRef<any>(undefined);

  @Output('on-node-destroy') onNodeDestroy:EventEmitter<ElementRef> = new EventEmitter<ElementRef>();


  public selection: TokenSelectionMetadataModel = new TokenSelectionMetadataModel();


  constructor(private selectionSvc: TokenSelectionProcessorService) {
  }

  ngOnChanges(changes: SimpleChanges) {

    this.selection = this.selectionSvc.getMetaData(this.group.root!, this.selectionInput);

  }


  ngAfterViewInit() {

    this.onCircleReady.emit({group:this.group,element:this.nodeCircle})

  }


  public onTagSpanClicked(): void {

    if (!this.disableTagClick) {

      this.onTagClicked.emit(this.group);
    }

  }

  private isSelected(token: TokenModel): boolean {

    if (this.group.id == this.selectionInput.selectionGroupId) {

      return this.selection.selectedSet.has(token.index);
    }

    return false;
  }

  private isSelectable(token: TokenModel): boolean {


    if (this.group.id == this.selectionInput.selectionGroupId) {

      return this.selection.selectablesSet.has(token.index);
    }

    return true;
  }

  public tokenSelectionClass(token: TokenModel): string {

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


  public groupSelectionClass() {

    let cssClass = 'group';

    if (this.selectionInput.highlightedGroups.has(this.group.id)) {

      let hl = this.selectionInput.highlightedGroups.get(this.group.id);

      cssClass += ' group-highlighted';

      cssClass += ' bg-' + hl + '-subtle';
    }

    return cssClass;
  }


  public selectToken(token: TokenModel): void {

    if (!this.isSelectable(token)) {

      return;
    }

    if (this.selectionInput.selectionGroupId != this.group.id) {

      this.selectionInput.selectedTokenIndexes = [];

      this.selectionInput.selectionGroupId = this.group.id;
    }

    let existingIndex = this.selectionInput.selectedTokenIndexes.indexOf(token.index);

    if (existingIndex > -1) {

      this.selectionInput.selectedTokenIndexes.splice(existingIndex, 1);

    } else {

      this.selectionInput.selectedTokenIndexes.push(token.index);
    }

    if (this.selectionInput.selectedTokenIndexes.length == 0) {

      this.selectionInput.selectionGroupId = -1;
    }

    this.selection = this.selectionSvc.getMetaData(this.group.root!, this.selectionInput);
  }

  ngOnDestroy() {

    this.onNodeDestroy.emit(this.nodeCircle);
  }

}
