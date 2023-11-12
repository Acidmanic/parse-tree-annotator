import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {GithubAccessTokenModel} from "../../models/api/github-access-token.model";
import {BaseUrlService} from "../base-url.service";


@Injectable({
  providedIn: 'root'
})
export class AccountsApiService {


  public static readonly githubExchangeUrl = 'api/accounts/github/exchange/';

  constructor(public http:HttpClient) {
  }




  public exchangeGithubCode(code:string):Observable<GithubAccessTokenModel>{

    let url = BaseUrlService.baseUrl + '/' +AccountsApiService.githubExchangeUrl + code;

    return this.http.post<GithubAccessTokenModel>(url,{});

    // let handler = new Subject<GithubAccessTokenModel>();
    //
    //
    //
    //
    // return handler;

  }

}
