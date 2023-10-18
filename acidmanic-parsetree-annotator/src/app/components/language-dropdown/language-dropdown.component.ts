import { Component } from '@angular/core';
import {InternationalizationService} from "../../services/internationalization.service";
import {LanguageModel} from "../../models/language.model";
import {UiPreferencesActionsService} from "../../services/ui-preferences-actions.service";

@Component({
  selector: 'language-dropdown',
  templateUrl: './language-dropdown.component.html',
  styleUrls: ['./language-dropdown.component.scss']
})
export class LanguageDropdownComponent {



  constructor(public svcInternationalization:InternationalizationService,
              private svcUiPref:UiPreferencesActionsService) {

  }


  public selectLanguage(lang:LanguageModel){

    this.svcInternationalization.setLanguage(lang.name);

    this.svcUiPref.setDirection(lang.direction);

  }
}
