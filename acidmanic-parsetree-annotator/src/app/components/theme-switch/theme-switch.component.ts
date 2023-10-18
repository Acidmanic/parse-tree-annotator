import {Component, OnInit} from '@angular/core';
import {UiPreferencesDataService} from "../../services/ui-preferences-data.service";
import {UiPreferencesActionsService} from "../../services/ui-preferences-actions.service";
import {UiPreferencesModel} from "../../models/application-models/ui-preferences.model";
import {ThemeModel} from "../../models/application-models/theme.model";

@Component({
  selector: 'theme-switch',
  templateUrl: './theme-switch.component.html',
  styleUrls: ['./theme-switch.component.scss']
})
export class ThemeSwitchComponent implements OnInit {


  public isDark:boolean=true;
  public uiPref:UiPreferencesModel=new UiPreferencesModel();


  constructor(private svcUiData: UiPreferencesDataService,
              private svcUiActions: UiPreferencesActionsService) {
  }


  ngOnInit() {

    this.svcUiData.getPreferences().subscribe({
      next: uiPref => {

        this.uiPref = uiPref;

        this.isDark = this.uiPref.themeId==ThemeModel.darkTheme.id;

      }
    });
  }



  onToggleTheme() {

    if(this.isDark){

      this.uiPref.themeId = ThemeModel.lightTheme.id;
    }else{
      this.uiPref.themeId = ThemeModel.darkTheme.id;
    }

    this.svcUiData.setPreferences(this.uiPref);

    this.svcUiActions.setTheme(this.uiPref.themeId);

    this.isDark = !this.isDark;

  }
}
