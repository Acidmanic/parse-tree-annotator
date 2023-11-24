import {Component, OnInit} from '@angular/core';
import {InternationalizationService} from "../../services/internationalization.service";
import {LanguageModel} from "../../models/language.model";
import {UiPreferencesActionsService} from "../../services/ui-preferences-actions.service";
import {I18nLanguageModel} from "../../models/i18n-models/i18n-language.model";

@Component({
  selector: 'language-dropdown',
  templateUrl: './language-dropdown.component.html',
  styleUrls: ['./language-dropdown.component.scss']
})
export class LanguageDropdownComponent implements OnInit {


  public languages: LanguageModel[] = [];

  constructor(public svcInternationalization: InternationalizationService,
              private svcUiPref: UiPreferencesActionsService) {

  }


  public selectLanguage(lang: LanguageModel) {

    this.svcInternationalization.setLanguage(lang.name);

    this.svcUiPref.setDirection(lang.direction);

  }


  ngOnInit() {

    this.svcInternationalization.loadAsync().subscribe({
      next: value => this.languages = this.svcInternationalization.availableLanguages
    });


  }
}
