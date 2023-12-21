import {Injectable} from "@angular/core";
import {HotToastService} from "@ngneat/hot-toast";
import {UiPreferencesDataService} from "./ui-preferences-data.service";
import {InternationalizationService} from "./internationalization.service";
import {UiPreferencesModel} from "../models/application-models/ui-preferences.model";


@Injectable({providedIn:'root'})
export class ShareopolisToasterService{



  private uiPref:UiPreferencesModel=new UiPreferencesModel();

  constructor(private toast:HotToastService,
              private ui:UiPreferencesDataService,
              private i18n:InternationalizationService) {

    this.ui.getPreferences().subscribe({
      next: p => this.uiPref =p,
    });

  }


  public creditWon(credits:number):void{

    let text = '🙏' + this.i18n.currentLanguage.strings['CREDIT_WON_MESSAGE'] + '+' +credits +'🏆';

    this.toast.success(text, {
      position: "top-center",
      theme: this.uiPref.themeId == 'dark'? "snackbar":"toast",
      autoClose: true,
      dismissible: false,
      duration: 2000
    });
  }
}
