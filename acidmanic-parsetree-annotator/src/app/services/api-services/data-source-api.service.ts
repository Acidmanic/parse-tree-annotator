import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {BaseUrlService} from "../base-url.service";
import {UserInformationModel} from "../../models/user-information.model";
import {ResultModel} from "../../models/result.model";
import {SentenceTaskModel} from "../../models/api/sentence-task.model";
import {ParsedTreeModel} from "../../models/api/parsed-tree.model";


@Injectable({
  providedIn: 'root'
})
export class DataSourceApiService {


  public static readonly fetchSentenceUri='api/data-source/fetch-sentence/';
  public static readonly skipSentenceUri='api/data-source/skip-sentence/';
  public static readonly deliverSentenceUri='api/data-source/deliver-parsed-tree';

  constructor(private http:HttpClient) {
  }


  public fetchSentence(languageShortname:string):Observable<ResultModel<SentenceTaskModel>>{

    let url = BaseUrlService.authBaseUrl + '/' + DataSourceApiService.fetchSentenceUri+languageShortname.toLowerCase();

    return this.http.get<ResultModel<SentenceTaskModel>>(url);

  }

  public skipSentence(sentenceId:string):Observable<ResultModel<SentenceTaskModel>>{

    let url = BaseUrlService.authBaseUrl + '/' + DataSourceApiService.skipSentenceUri+sentenceId;

    return this.http.put<ResultModel<SentenceTaskModel>>(url,{});
  }

  public deliverSentence(sentenceId:string,parsedTree:string,languageShortName:string):Observable<ResultModel<SentenceTaskModel>>{

    let url = BaseUrlService.authBaseUrl + '/' + DataSourceApiService.deliverSentenceUri;

    let model = new ParsedTreeModel();
    model.sentenceId=sentenceId;
    model.parsedTree=parsedTree;
    model.languageShortName=languageShortName;

    return this.http.post<ResultModel<SentenceTaskModel>>(url,model);
  }

}
