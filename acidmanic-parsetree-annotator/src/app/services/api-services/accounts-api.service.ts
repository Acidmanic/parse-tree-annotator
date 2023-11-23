import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {BaseUrlService} from "../base-url.service";
import {UserInformationModel} from "../../models/user-information.model";


@Injectable({
  providedIn: 'root'
})
export class AccountsApiService {


  public static readonly userInformationUri='login/user-information';

  constructor(public http:HttpClient) {
  }


  public getUserInformation():Observable<UserInformationModel>{

    let url = BaseUrlService.baseUrl + '/' + AccountsApiService.userInformationUri;

    return this.http.get<UserInformationModel>(url);

  }

}
