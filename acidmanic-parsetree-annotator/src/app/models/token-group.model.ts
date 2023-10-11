import {TokenModel} from "./token.model";


export class TokenGroupModel{

  public tokens:TokenModel[]=[];
  public tag:string='';
  public children:TokenGroupModel[]=[];


}
