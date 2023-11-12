import { Component } from '@angular/core';
import {MultiLingualComponentBase} from "../../../components/multi-lingual-component-base";
import {InternationalizationService} from "../../../services/internationalization.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-github',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.scss']
})
export class GithubComponent extends MultiLingualComponentBase{


  private queryParamsSubscription?:Subscription;


  constructor(i18n:InternationalizationService,
              private route:ActivatedRoute) {
    super(i18n);
  }


  protected override onInitHook() {

    this.queryParamsSubscription = this.route.queryParams.subscribe(
      qParams => this.processQueryParameters(qParams)
    );

  }


  protected override onDestroyHook() {

    if(this.queryParamsSubscription){

      this.queryParamsSubscription.unsubscribe();
    }
  }

  private processQueryParameters(qParams: Params) {

    if(qParams){

      if(qParams.code){

        //exchange for access_token

      }else{
        // check for error
      }

    }
  }
}
