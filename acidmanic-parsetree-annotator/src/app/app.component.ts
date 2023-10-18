import {Component, OnInit} from '@angular/core';
import {UiPreferencesDataService} from "./services/ui-preferences-data.service";
import {UiPreferencesActionsService} from "./services/ui-preferences-actions.service";
import {InternationalizationService} from "./services/internationalization.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  constructor(private svcUiData: UiPreferencesDataService,
              private svcUiActions: UiPreferencesActionsService,
              private svcInternationalization: InternationalizationService) {
  }


  ngOnInit() {
    this.svcUiData.getPreferences().subscribe({
      next: uiPref => {

        this.svcUiActions.setTheme(uiPref.themeId);

        this.svcInternationalization.loadAsync().subscribe({
          next: loaded => {

            if (loaded) {

              let found = this.svcInternationalization.getLanguageByName(uiPref.languageName);

              if (found) {

                this.svcUiActions.setDirection(found.direction);
              }
            }
          }
        });
      }
    });
  }
}
