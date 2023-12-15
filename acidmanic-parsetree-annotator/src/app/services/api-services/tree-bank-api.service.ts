import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PosTagBankModel} from "../../models/pos-tag-bank.model";
import {BaseUrlService} from "../base-url.service";
import {CollectionDtoModel} from "../../models/collection-dto.model";


@Injectable({
  providedIn: 'root'
})
export class TreeBankApiService {


  public static defaultController: string = 'tree-bank';
  public static byLanguageUrl: string = 'tree-bank/pos-tags-by-language/';
  public static byModelNameUrl: string = 'tree-bank/pos-tags-by-model/';

  constructor(private http: HttpClient) {
  }


  public getTreeBankByModelName(modelName: string): Observable<PosTagBankModel> {

    let url = BaseUrlService.baseUrl + '/' + TreeBankApiService.byModelNameUrl + modelName;

    return this.http.get<PosTagBankModel>(url);
  }

  public getTreeBankByLanguage(languageShortName: string): Observable<PosTagBankModel> {

    let url = BaseUrlService.baseUrl + '/' + TreeBankApiService.byLanguageUrl + languageShortName;

    return this.http.get<PosTagBankModel>(url);
  }

  public getAvailableModelNames(): Observable<CollectionDtoModel<string>> {

    let url = BaseUrlService.baseUrl + '/' + TreeBankApiService.defaultController;

    return this.http.get<CollectionDtoModel<string>>(url);

  }

}
