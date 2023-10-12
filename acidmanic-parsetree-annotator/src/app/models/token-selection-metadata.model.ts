import {TokenGroupModel} from "./token-group.model";

export class TokenSelectionMetadataModel {

  public minSelectedIndex: number = 0;
  public maxSelectedIndex: number = 0;

  //public selectionMap:Map<number,boolean>= new Map<number, boolean>();
  public selectedSet: Set<number> = new Set<number>();
  public selectablesSet: Set<number> = new Set<number>();

  public leaves:TokenGroupModel[]=[];
  public singularLeaves:Map<number,TokenGroupModel> = new Map<number, TokenGroupModel>();


  public singularLeafedTokensSelected:boolean=false;

  public noneSingularLeafedTokensSelected:boolean=false;


  public treeIsComplete:boolean=false;


}
