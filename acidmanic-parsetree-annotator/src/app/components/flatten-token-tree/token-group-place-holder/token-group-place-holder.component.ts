import {Component, ElementRef, EventEmitter, Input, Output} from '@angular/core';
import {TokenGroupPlaceholderModel} from "../../../models/token-group-placeholder.model";
import {TokenGroupModel} from "../../../models/token-group.model";
import {TokenSelectionModel} from "../../../models/token-selection.model";
import {GroupElement} from "../../../models/group.element";
import {TokenSelectionCacheModel} from "../../../models/token-selection-cache.model";
import {PariModel} from "../../../models/pari.model";
import {TokenModel} from "../../../models/token.model";

@Component({
  selector: 'token-group-place-holder',
  templateUrl: './token-group-place-holder.component.html',
  styleUrls: ['./token-group-place-holder.component.scss']
})
export class TokenGroupPlaceHolderComponent {

  @Input('place-holder') placeHolder:TokenGroupPlaceholderModel= new TokenGroupPlaceholderModel();
  @Input('selection') selectionInput: TokenSelectionModel = new TokenSelectionModel();
  @Output('on-tag-clicked') onTagClicked: EventEmitter<TokenGroupModel> = new EventEmitter<TokenGroupModel>();
  @Input('disable-tag-click') disableTagClick: boolean = false;
  @Output('on-circle-ready') onCircleReady:EventEmitter<GroupElement>= new EventEmitter<GroupElement>();
  @Output('on-node-destroy') onNodeDestroy:EventEmitter<ElementRef> = new EventEmitter<ElementRef>();
  @Input('token-z-index') tokenZIndex?:number;

  @Input('selection-updates') selectionUpdates:EventEmitter<TokenSelectionCacheModel> = new EventEmitter<TokenSelectionCacheModel>();


  @Output('on-delete-group') onDeleteGroup: EventEmitter<TokenGroupModel> = new EventEmitter<TokenGroupModel>();
  @Output('on-delete-tokens') onDeleteTokens: EventEmitter<PariModel<TokenGroupModel, TokenModel>[]> = new EventEmitter<PariModel<TokenGroupModel, TokenModel>[]>();
  @Output('on-sub-group') onSubGroup: EventEmitter<PariModel<TokenGroupModel, number[]>> = new EventEmitter<PariModel<TokenGroupModel, number[]>>();


}
