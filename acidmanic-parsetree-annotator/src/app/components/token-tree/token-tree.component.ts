import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges, ViewChild
} from '@angular/core';
import {TokenGroupModel} from "../../models/token-group.model";
import {TokenSelectionModel} from "../../models/token-selection.model";
import {TokenSelectionMetadataModel} from "../../models/token-selection-metadata.model";
import {TokenSelectionProcessorService} from "../../services/token-selection-processor.service";
import {TokenModel} from "../../models/token.model";
import {TokenGroupPlaceholderModel} from "../../models/token-group-placeholder.model";
import {TokenProcessorService} from "../../services/token-processor.service";
import {Subscription} from "rxjs";
import {TokenGroupAnchorElementMapModel} from "../../models/token-group-anchor-element-map.model";



@Component({
  selector: 'token-tree',
  templateUrl: './token-tree.component.html',
  styleUrls: ['./token-tree.component.scss']
})
export class TokenTreeComponent implements OnInit, OnChanges, AfterViewInit {


  @Input('group') group: TokenGroupModel = new TokenGroupModel();
  @Input('selection') selectionInput: TokenSelectionModel = new TokenSelectionModel();
  @Output('on-tag-clicked') onTagClicked: EventEmitter<TokenGroupModel> = new EventEmitter<TokenGroupModel>();
  @Input('disable-tag-click') disableTagClick: boolean = false;

  @Input('element-map') elementMap: TokenGroupAnchorElementMapModel = new TokenGroupAnchorElementMapModel();


  public selection: TokenSelectionMetadataModel = new TokenSelectionMetadataModel();





  @ViewChild('nodeCircle') nodeCircleElement?: ElementRef;

  private alreadySentMyCircle: boolean = false;


  constructor(private selectionSvc: TokenSelectionProcessorService,
              private groupProcessor: TokenProcessorService) {
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

  ngOnInit() {

    console.log('ngOnInit', this.group.id);

    this.refresh();

  }

  ngAfterViewInit() {

    if (!this.alreadySentMyCircle) {

      this.alreadySentMyCircle = true;

      console.log('ngAfterViewInit', this.group.id);

      this.elementMap.register(this.group, this.nodeCircleElement!);

    }

  }


  ngOnChanges(changes: SimpleChanges) {

    console.log('ngOnChanges', this.group.id);


    if (changes['group'] || changes['selectionInput']) {

      this.refresh();
    }

  }

  ngOnDestroy() {

    console.log('ngOnChanges', this.group.id);

    this.elementMap.unregister(this.group);

  }

  private refresh(): void {

    console.log('refresh', this.group.id);

    this.removeUnExistingLines();

    this.selection = this.selectionSvc.getMetaData(this.group.root!, this.selectionInput);

  }

  public processPlaceholders(): TokenGroupPlaceholderModel[] {

    let placeHolders: TokenGroupPlaceholderModel[] = [];

    for (let i = 0; i < this.group.tokens.length; i++) {

      let token = this.group.tokens[i];

      let ph = this.createPlaceHolderByToken(token);

      placeHolders.push(ph);

    }

    return placeHolders;

  }


  private createPlaceHolderByToken(token: TokenModel): TokenGroupPlaceholderModel {

    let ph = new TokenGroupPlaceholderModel();

    ph.text = token.text;

    for (const child of this.group.children) {

      if (child.firstTokenId == token.index) {

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

  public onTagSpanClicked(): void {

    if (!this.disableTagClick) {

      this.onTagClicked.emit(this.group);
    }

  }

  private removeUnExistingLines() {

  }

}
