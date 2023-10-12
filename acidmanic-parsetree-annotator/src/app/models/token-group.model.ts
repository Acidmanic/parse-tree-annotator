import {TokenModel} from "./token.model";


export class TokenGroupModel{
  public id:number=0;
  public tokens:TokenModel[]=[];
  public tag:string='';
  public children:TokenGroupModel[]=[];


}
