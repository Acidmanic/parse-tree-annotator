

export type highlight= "danger" | "info" | "warning" | "primary" | "success" | "dark" | "secondary" | "light";

export class TokenSelectionModel {

  public selectionGroupId:number=-1;
  public selectedTokenIndexes:number[]=[];

  public highlightedGroups:Map<number,highlight>=new Map<number, highlight>();

}
