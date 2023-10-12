export class TokenSelectionMetadataModel {

  public minSelectedIndex: number = 0;
  public maxSelectedIndex: number = 0;

  //public selectionMap:Map<number,boolean>= new Map<number, boolean>();
  public selectedSet: Set<number> = new Set<number>();
  public selectablesSet: Set<number> = new Set<number>();

}
