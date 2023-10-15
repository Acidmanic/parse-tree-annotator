import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PosTagBankModel} from "../../models/pos-tag-bank.model";
import {BaseUrlService} from "../base-url.service";
import {CollectionDtoModel} from "../../models/collection-dto.model";


@Injectable({
  providedIn:'root'
})
export class TreeBankApiService {


  public static bankUrl:string='tree-bank/pos-tags/';

  constructor(private http:HttpClient) {
  }


  public getTreeBankByModelName(modelName:string):Observable<PosTagBankModel>{

    let url = BaseUrlService.baseUrl + '/' + TreeBankApiService.bankUrl + modelName;

    return this.http.get<PosTagBankModel>(url);
  }

  public getAvailableModelNames():Observable<CollectionDtoModel<string>>{

    let url = BaseUrlService.baseUrl + '/' + TreeBankApiService.bankUrl ;

    return this.http.get<CollectionDtoModel<string>>(url);

  }

}
