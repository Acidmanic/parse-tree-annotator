import {LanguageModel} from "../language.model";


export class SentenceTaskModel{
  id: string='';
  language:LanguageModel=new LanguageModel();
  tokens:string[]=[];
  credit:number=0;
}
