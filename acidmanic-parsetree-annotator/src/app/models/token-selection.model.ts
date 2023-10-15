

export type Highlight = "danger" | "info" | "warning" | "primary" | "success" | "dark" | "secondary" | "light";

export type HighlightIntensity = "normal" | "subtle";

export class TokenSelectionModel {

  public selectionGroupId:number=-1;
  public selectedTokenIndexes:number[]=[];

  public highlightedGroups:Map<number,Highlight>=new Map<number, Highlight>();

}
