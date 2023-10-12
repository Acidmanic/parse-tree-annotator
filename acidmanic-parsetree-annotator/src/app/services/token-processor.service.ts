import {Injectable} from "@angular/core";
import {TokenModel} from "../models/token.model";
import {TokenGroupModel} from "../models/token-group.model";
import {ResultModel} from "../models/result.model";


@Injectable({
  providedIn:'root'
})
export class TokenProcessorService{

  private static nextGroupId = 0;

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


  private generateGroupId():number{

    let id = TokenProcessorService.nextGroupId;

    TokenProcessorService.nextGroupId++;

    return id;
  }

  public subGroup(group:TokenGroupModel,indexes:number[],tag:string):boolean{

    let lastIndex = indexes[0];

    for (let i = 1; i < indexes.length; i++) {
        let index = indexes[i];

        if(index!=lastIndex+1){
          return false;
        }

        lastIndex = index;
    }

    for (const index of indexes) {

      for (const child of group.children) {

        for (const token of child.tokens) {
          if(token.index==index){
            return false;
          }
        }
      }
    }

    let subGroup = new TokenGroupModel();

    subGroup.id = this.generateGroupId();

    subGroup.tag=tag;

    for (const index of indexes) {

      let token = this.findByIndex(group,index);

      if(token.success){
        subGroup.tokens.push(token.value!);
      }
    }

    group.children.push(subGroup);

    return true;
  }

  private findByIndex(group:TokenGroupModel,index:number):ResultModel<TokenModel> {

    for (const token of group.tokens) {

      if (token.index == index) {

        return {success:true,value:token};
      }
    }
    return {success:false};
  }

  
}
