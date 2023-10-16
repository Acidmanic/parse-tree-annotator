import {TokenModel} from "./token.model";
import {Subject} from "rxjs";


export class TokenGroupModel{
  public id:number=-1;
  public tokens:TokenModel[]=[];
  public tag:string='';
  public children:TokenGroupModel[]=[];
  public root?:TokenGroupModel;
  public parent?:TokenGroupModel;
  public firstTokenId:number=-1;

}
