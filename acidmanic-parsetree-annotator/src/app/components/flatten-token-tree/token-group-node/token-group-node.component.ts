import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges, OnDestroy, OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {TokenGroupModel} from "../../../models/token-group.model";
import {TokenSelectionModel} from "../../../models/token-selection.model";
import {GroupElement} from "../../../models/group.element";
import {TokenModel} from "../../../models/token.model";
import {TokenSelectionProcessorService} from "../../../services/token-selection-processor.service";
import {TokenSelectionCacheModel} from "../../../models/token-selection-cache.model";
import {Subscription} from "rxjs";
import {GroupSelectionStateModel} from "../../../models/group-selection-state.model";
import {PariModel} from "../../../models/pari.model";


@Component({
  selector: 'token-group-node',
  templateUrl: './token-group-node.component.html',
  styleUrls: ['./token-group-node.component.scss']
})
export class TokenGroupNodeComponent implements OnInit, AfterViewInit, OnDestroy {


  @Input('group') group: TokenGroupModel = new TokenGroupModel();
  @Input('selection') selectionInput: TokenSelectionModel = new TokenSelectionModel();
  @Output('on-tag-clicked') onTagClicked: EventEmitter<TokenGroupModel> = new EventEmitter<TokenGroupModel>();
  @Input('disable-tag-click') disableTagClick: boolean = false;
  @Output('on-circle-ready') onCircleReady: EventEmitter<GroupElement> = new EventEmitter<GroupElement>();
  @ViewChild('nodeCircle') nodeCircle: ElementRef = new ElementRef<any>(undefined);
  @Output('on-node-destroy') onNodeDestroy: EventEmitter<ElementRef> = new EventEmitter<ElementRef>();
  @Input('token-z-index') tokenZIndex?: number;
  @Input('selection-updates') selectionUpdates: EventEmitter<TokenSelectionCacheModel> = new EventEmitter<TokenSelectionCacheModel>();

  @Output('on-delete-group') onDeleteGroup: EventEmitter<TokenGroupModel> = new EventEmitter<TokenGroupModel>();
  @Output('on-delete-tokens') onDeleteTokens: EventEmitter<PariModel<TokenGroupModel, TokenModel>[]> = new EventEmitter<PariModel<TokenGroupModel, TokenModel>[]>();
  @Output('on-sub-group') onSubGroup: EventEmitter<PariModel<TokenGroupModel, number[]>> = new EventEmitter<PariModel<TokenGroupModel, number[]>>();


  @ViewChild('tokensDiv') tokensDiv: any = new ElementRef(undefined);

  public selectionCache: TokenSelectionCacheModel = new TokenSelectionCacheModel();
  public myState: GroupSelectionStateModel = new GroupSelectionStateModel();
  private selectionUpdatesSubscription?: Subscription;

  constructor(private selectionProcessor: TokenSelectionProcessorService) {
  }

  ngOnInit() {

    this.selectionUpdatesSubscription = this.selectionUpdates.subscribe(cache => {

      this.selectionCache = cache;
      this.myState = cache.groupSelectionStateByGroupId.get(this.group.id)!;

      if (this.tokensDiv) {

        if (this.myState.canDoAnything) {
          this.tokensDiv.open();
        } else {
          this.tokensDiv.close();
        }
      }
    });
  }

  ngAfterViewInit() {

    this.onCircleReady.emit({group: this.group, element: this.nodeCircle})

  }


  public onTagSpanClicked(): void {

    if (!this.disableTagClick) {

      this.onTagClicked.emit(this.group);
    }

  }

  public tokenSelectionClass(token: TokenModel): string {

    let cssClass = 'token';

    let selected = this.selectionCache.selectedSet.has(this.group.id, token.index);// this.isSelected(token);

    let selectable = this.selectionCache.selectableSet.has(this.group.id, token.index);

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



  public tokenClicked(token: TokenModel): void {

    if (!this.selectionCache.clickableSet.has(this.group.id, token.index)) {

      return;
    }

    let selection = this.selectionProcessor.clone(this.selectionInput);

    if (selection.selectionGroupId != this.group.id) {

      selection.selectedTokenIndexes = [token.index];

      selection.selectionGroupId = this.group.id;

    } else {

      let existingIndex = selection.selectedTokenIndexes.indexOf(token.index);

      if (existingIndex > -1) {

        selection.selectedTokenIndexes.splice(existingIndex, 1);

      } else {

        selection.selectedTokenIndexes.push(token.index);
      }

      if (selection.selectedTokenIndexes.length == 0) {

        selection.selectionGroupId = -1;
      }

      selection.selectedTokenIndexes.sort((a, b) => a - b);
    }

    this.selectionProcessor.cloneInto(selection, this.selectionInput);

  }

  ngOnDestroy() {

    this.onNodeDestroy.emit(this.nodeCircle);

    if (this.selectionUpdatesSubscription) {
      this.selectionUpdatesSubscription.unsubscribe();
    }
  }

  onGroupDeleteClick() {

    this.onDeleteGroup.emit(this.group);
  }

  onTokenDeleteClick() {

    let event: PariModel<TokenGroupModel, TokenModel>[] = [];

    for (const token of this.group.tokens) {

      let tokenState = this.selectionCache.tokenSelectionStateByTokenIndex.get(this.group.id, token.index);

      if (tokenState && tokenState.isSelected) {

        let pari: PariModel<TokenGroupModel, TokenModel> = {first: this.group, second: token};

        event.push(pari);
      }
    }

    if (event.length > 0) {

      this.onDeleteTokens.emit(event);
    }

  }

  onSubGroupClicked() {

    let event = new PariModel<TokenGroupModel,number[]>(this.group,this.selectionInput.selectedTokenIndexes);

    this.onSubGroup.emit(event);
  }

}
