import {InternationalizationService} from "../services/internationalization.service";
import {I18nLanguageModel} from "../models/i18n-models/i18n-language.model";
import {Subscription} from "rxjs";
import {Component, OnDestroy, OnInit} from "@angular/core";

@Component({
  template: ''
})
export abstract class MultiLingualComponentBase implements OnInit,OnDestroy{


  public currentLanguage:I18nLanguageModel= new I18nLanguageModel();

  private languageSubscription?:Subscription;

  protected constructor(public internationalizationService:InternationalizationService) {


  }


  ngOnInit() {

    this.currentLanguage = this.internationalizationService.currentLanguage;

    this.languageSubscription = this.internationalizationService.languageChange()
      .subscribe(lang => {
        this.currentLanguage = lang;
        this.onLanguageChangeHook(lang);
      });

    this.onInitHook();
  }


  ngOnDestroy() {

    if(this.languageSubscription){

      this.languageSubscription.unsubscribe();
    }

    this.onDestroyHook();
  }

  protected onLanguageChangeHook(lang:I18nLanguageModel){

  }

  protected onInitHook(){

  }

  protected onDestroyHook(){

  }
}
