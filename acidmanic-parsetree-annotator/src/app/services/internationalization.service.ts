import {Injectable} from "@angular/core";
import {I18nLanguageModel} from "../models/i18n-models/i18n-language.model";
import {InternationalizationDataModel} from "../models/i18n-models/internationalization-data.model";
import {HttpClient} from "@angular/common/http";
import {UiPreferencesDataService} from "./ui-preferences-data.service";
import {UiPreferencesModel} from "../models/application-models/ui-preferences.model";
import {LanguageModel} from "../models/language.model";
import {UiPreferencesActionsService} from "./ui-preferences-actions.service";
import {Observable, Subject} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class InternationalizationService {


  private data: InternationalizationDataModel = new InternationalizationDataModel();
  private uiPref: UiPreferencesModel = new UiPreferencesModel();
  private receivedData: boolean = false;


  public currentLanguage: I18nLanguageModel = new I18nLanguageModel();
  public availableLanguages: LanguageModel[] = [];

  private onLanguageChange: Subject<I18nLanguageModel> = new Subject<I18nLanguageModel>();

  constructor(private http: HttpClient,
              private svcUiData: UiPreferencesDataService,
              private svcUiActions: UiPreferencesActionsService) {

    this.checkGetData();

    this.svcUiData.getPreferences().subscribe({
      next: pref => {
        this.uiPref = pref;

        this.updateCache();
      }
    });
  }


  private checkGetData() {

    this.loadAsync();
  }

  public loadAsync(): Observable<boolean> {

    let handler = new Subject<boolean>();

    if (!this.receivedData) {

      this.http.get<InternationalizationDataModel>
      ('assets/data/internationalization.data.json').subscribe({
        next: d => {

          this.data = d;

          this.receivedData = true;

          this.updateCache();

          handler.next(true);

          if (d.languages && d.languages.length > 0) {


            if (this.currentLanguage.name.length == 0) {

              this.currentLanguage = d.languages[0];
              this.onLanguageChange.next(this.currentLanguage);
            }


          }
        },
        error: err => handler.error(err),
        complete: () => handler.complete()
      });
    }

    return handler;
  }

  public languages(): I18nLanguageModel[] {

    return this.data.languages;
  }


  public getLanguageByName(name: string): I18nLanguageModel | undefined {

    for (const language of this.data.languages) {

      if (language.name.toLowerCase() == name.toLowerCase()) {

        return language;

      }
    }
    return undefined;
  }


  private updateCache() {

    this.currentLanguage = this.getLanguageByName(this.uiPref.languageName) ?? new I18nLanguageModel();

    this.availableLanguages = [];

    for (const language of this.data.languages) {

      let lan = new LanguageModel();

      lan.name = language.name;

      lan.direction = language.direction;

      lan.shortName = language.shortName;

      this.availableLanguages.push(lan);
    }
  }

  public setLanguage(name: string) {

    let languageFound = this.getLanguageByName(name);

    if (languageFound) {

      this.uiPref.languageName = languageFound.name;

      this.svcUiData.setPreferences(this.uiPref);

      this.updateCache();

      this.onLanguageChange.next(languageFound!);
    }
  }

  public languageChange(): Observable<I18nLanguageModel> {

    this.checkGetData();

    return this.onLanguageChange;
  }
}
