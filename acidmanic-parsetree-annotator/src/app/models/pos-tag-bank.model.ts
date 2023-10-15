import {PosTagModel} from "./pos-tag.model";
import {LanguageModel} from "./language.model";


export class PosTagBankModel{


  public tags:PosTagModel[]=[];

  public language:LanguageModel=new LanguageModel();

  public bankName:string='';

}
