import {GroupSelectionStateModel} from "./group-selection-state.model";
import {TokenSelectionStateModel} from "./token-selection-state.model";
import {TokenGroupModel} from "./token-group.model";
import {DoubleKeyMapModel} from "./double-key-map.model";
import {DoubleKeySetModel} from "./double-key-set.model";


export class TokenSelectionCacheModel{


  public canDelete:boolean=false;
  public canSubGroup:boolean=false;

  public groupSelectionStateByGroupId:Map<number,GroupSelectionStateModel>=new Map<number, GroupSelectionStateModel>();
  public tokenSelectionStateByTokenIndex:DoubleKeyMapModel<number,number,TokenSelectionStateModel> = new DoubleKeyMapModel<number, number, TokenSelectionStateModel>();

  public selectedSet: DoubleKeySetModel<number,number> = new DoubleKeySetModel<number,number>();
  public selectableSet: DoubleKeySetModel<number,number> = new DoubleKeySetModel<number,number>();
  public clickableSet: DoubleKeySetModel<number,number> = new DoubleKeySetModel<number,number>();

  public leaves:Map<number,TokenGroupModel> = new Map<number, TokenGroupModel>();
  public singularLeaves:Map<number,TokenGroupModel> = new Map<number, TokenGroupModel>();


}
