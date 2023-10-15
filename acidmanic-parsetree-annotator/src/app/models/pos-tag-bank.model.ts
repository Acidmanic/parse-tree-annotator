import {PosTagModel} from "./pos-tag.model";
import {LanguageModel} from "./language.model";


export class PosTagBankModel{


  tags:PosTagModel[]=[];

  language:LanguageModel=new LanguageModel();

}
