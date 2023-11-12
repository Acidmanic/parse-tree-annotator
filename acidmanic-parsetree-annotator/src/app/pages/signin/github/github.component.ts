import {Component} from '@angular/core';
import {MultiLingualComponentBase} from "../../../components/multi-lingual-component-base";
import {InternationalizationService} from "../../../services/internationalization.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Subscription} from "rxjs";
import {AccountsApiService} from "../../../services/api-services/accounts-api.service";

@Component({
  selector: 'app-github',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.scss']
})
export class GithubComponent extends MultiLingualComponentBase {


  private queryParamsSubscription?: Subscription;


  constructor(i18n: InternationalizationService,
              private route: ActivatedRoute,
              private accounts: AccountsApiService) {
    super(i18n);
  }


  protected override onInitHook() {

    this.queryParamsSubscription = this.route.queryParams.subscribe(
      qParams => this.processQueryParameters(qParams)
    );

  }


  protected override onDestroyHook() {

    if (this.queryParamsSubscription) {

      this.queryParamsSubscription.unsubscribe();
    }
  }

  private processQueryParameters(qParams: Params) {

    if (qParams) {

      let code = qParams['code'];

      if (code) {


        console.log('received code: ', code);

        this.accounts.exchangeGithubCode(code).subscribe({

          next: token => {

            console.log('Login successful. Github Token:', token);
          },
          error: err => {
            console.log('Login Failed.', err);
          },
          complete: () => {
          }
        });

      } else {
        console.log('unable to be authorized. ', qParams);
      }

    }
  }
}
