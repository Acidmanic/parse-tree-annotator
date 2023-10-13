import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PosTagBankModel} from "../../models/pos-tag-bank.model";
import {BaseUrlService} from "../base-url.service";


@Injectable({
  providedIn:'root'
})
export class PennApiService{


  public static bankUrl:string='penn/pos-tags';


  constructor(private http:HttpClient) {
  }


  public getPennTreeBank():Observable<PosTagBankModel>{

    let url = BaseUrlService.baseUrl + '/' + PennApiService.bankUrl;

    return this.http.get<PosTagBankModel>(url);
  }


}
