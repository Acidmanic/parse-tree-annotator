import {Component, OnInit} from '@angular/core';
import {UiPreferencesService} from "./services/ui-preferences.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  constructor(private svcUiPref: UiPreferencesService) {
  }


  ngOnInit() {
    this.svcUiPref.getPreferences().subscribe({
      next: uiPref => {
        console.log('ui-pref', uiPref);

        document.documentElement.setAttribute('data-bs-theme',uiPref.themeId);

      }
    });
  }
}
