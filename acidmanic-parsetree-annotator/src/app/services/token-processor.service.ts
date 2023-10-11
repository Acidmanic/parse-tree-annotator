import {Injectable} from "@angular/core";
import {TokenModel} from "../models/token.model";
import {TokenGroupModel} from "../models/token-group.model";


@Injectable({
  providedIn:'root'
})
export class TokenProcessorService{


  public toTopGroup(tokens:TokenModel[]):TokenGroupModel{

    return this.toSubGroup(tokens,'TOP');
  }

  public toSubGroup(tokens:TokenModel[],tag:string):TokenGroupModel{

    let group = new TokenGroupModel();

    group.tag=tag;
    group.tokens=tokens;
    group.children=[];

    return group;
  }

}
