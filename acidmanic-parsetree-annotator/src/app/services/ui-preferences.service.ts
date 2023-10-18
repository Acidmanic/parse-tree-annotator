import {Injectable} from "@angular/core";
import {UiPreferencesModel} from "../models/application-models/ui-preferences.model";
import {Observable, Observer, Subject, Subscription} from "rxjs";
import {ObjectLocalStorageService} from "./object-local-storage.service";
import {ResultModel} from "../models/result.model";



@Injectable({
  providedIn:'root'
})
export class UiPreferencesService {

  private static readonly UI_PREF_STG_KEY:string='UI_PREF_STG';


  constructor(private svcStorage:ObjectLocalStorageService) {
  }


  public getPreferences():Observable<UiPreferencesModel>{

    let handler = new Subject<UiPreferencesModel>();

    let uiPref = this.svcStorage.getOrDefaultAndSet<UiPreferencesModel>(
      UiPreferencesService.UI_PREF_STG_KEY,
      new UiPreferencesModel());


    setTimeout(()=> handler.next(uiPref),10);


    return handler;

  }
}
