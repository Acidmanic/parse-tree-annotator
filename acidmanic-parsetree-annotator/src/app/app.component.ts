import {Component, OnInit} from '@angular/core';
import {UiPreferencesDataService} from "./services/ui-preferences-data.service";
import {UiPreferencesActionsService} from "./services/ui-preferences-actions.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  constructor(private svcUiData: UiPreferencesDataService,
              private svcUiActions: UiPreferencesActionsService) {
  }


  ngOnInit() {
    this.svcUiData.getPreferences().subscribe({
      next: uiPref => {
        console.log('ui-pref', uiPref);

        this.svcUiActions.setTheme(uiPref.themeId);

      }
    });
  }
}
