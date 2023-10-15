import {TokenModel} from "./token.model";
import {TokenGroupModel} from "./token-group.model";


export class TokenGroupMapModel{


  public tokensByIndex:Map<number,TokenModel> = new Map<number, TokenModel>();

  public groupsById:Map<number,TokenGroupModel>= new Map<number, TokenGroupModel>();
}
