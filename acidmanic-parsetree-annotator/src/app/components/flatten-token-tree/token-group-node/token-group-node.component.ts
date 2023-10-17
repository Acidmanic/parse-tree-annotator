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


  public selectionCache: TokenSelectionCacheModel = new TokenSelectionCacheModel();
  private selectionUpdatesSubscription?: Subscription;

  constructor(private selectionProcessor: TokenSelectionProcessorService) {
  }

  ngOnInit() {

    this.selectionUpdatesSubscription = this.selectionUpdates.subscribe(cache => {
      this.selectionCache = cache;
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

      selection.selectedTokenIndexes = [];

      selection.selectionGroupId = this.group.id;
    }else {

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

  onUpClick() {

  }

  onDownClick() {

  }
}
