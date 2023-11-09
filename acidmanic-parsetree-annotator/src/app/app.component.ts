import {Component, OnDestroy, OnInit} from '@angular/core';
import {UiPreferencesDataService} from "./services/ui-preferences-data.service";
import {UiPreferencesActionsService} from "./services/ui-preferences-actions.service";
import {InternationalizationService} from "./services/internationalization.service";
import {I18nLanguageModel} from "./models/i18n-models/i18n-language.model";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {


  public currentLanguage: I18nLanguageModel = new I18nLanguageModel();

  private languageChangeSubscription?: Subscription;

  constructor(private svcUiData: UiPreferencesDataService,
              private svcUiActions: UiPreferencesActionsService,
              public svcInternationalization: InternationalizationService,
              private router:Router) {
  }


  ngOnInit() {

    this.languageChangeSubscription =
      this.svcInternationalization.languageChange()
        .subscribe({
          next: lang => {
            this.currentLanguage = lang;

            this.svcUiActions.setDirection(lang.direction);
          }
        });

    this.svcUiData.getPreferences().subscribe({
      next: uiPref => {

        this.svcUiActions.setTheme(uiPref.themeId);

        this.svcInternationalization.loadAsync().subscribe({
          next: loaded => {

            if (loaded) {

              this.svcInternationalization.setLanguage(uiPref.languageName);

            }
          }
        });
      }
    });


  }


  ngOnDestroy() {

    if (this.languageChangeSubscription) {

      this.languageChangeSubscription?.unsubscribe();
    }
  }

  navigateTo(path: string) {

    this.router.navigate([path]);

  }
}
