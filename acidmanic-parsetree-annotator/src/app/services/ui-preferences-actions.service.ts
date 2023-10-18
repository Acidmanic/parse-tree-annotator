import {Injectable} from "@angular/core";
import {InternationalizationService} from "./internationalization.service";
import {I18nLanguageModel} from "../models/i18n-models/i18n-language.model";


@Injectable({
  providedIn: 'root'
})
export class UiPreferencesActionsService {


  constructor(private svcInternationalization:InternationalizationService) {
  }



  public setTheme(id:string){
    document.documentElement.setAttribute('data-bs-theme',id);
  }

  public setDirection(direction: string) {

    document.documentElement.dir = direction;
  }
}
