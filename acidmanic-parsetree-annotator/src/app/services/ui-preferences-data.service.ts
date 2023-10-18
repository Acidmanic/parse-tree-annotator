import {Injectable} from "@angular/core";
import {UiPreferencesModel} from "../models/application-models/ui-preferences.model";
import {Observable, Observer, Subject, Subscription} from "rxjs";
import {ObjectLocalStorageService} from "./object-local-storage.service";
import {ResultModel} from "../models/result.model";



@Injectable({
  providedIn:'root'
})
export class UiPreferencesDataService {

  private static readonly UI_PREF_STG_KEY:string='UI_PREF_STG';


  constructor(private svcStorage:ObjectLocalStorageService) {
  }


  public getPreferences():Observable<UiPreferencesModel>{

    let handler = new Subject<UiPreferencesModel>();

    let uiPref = this.svcStorage.getOrDefaultAndSet<UiPreferencesModel>(
      UiPreferencesDataService.UI_PREF_STG_KEY,
      new UiPreferencesModel());


    setTimeout(()=> handler.next(uiPref),10);


    return handler;

  }

  public setPreferences(uiPref: UiPreferencesModel) {

    this.svcStorage.storeData<UiPreferencesModel>(UiPreferencesDataService.UI_PREF_STG_KEY, uiPref);


  }
}
