import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {InternationalizationService} from "../../services/internationalization.service";
import {MultiLingualComponentBase} from "../../components/multi-lingual-component-base";
import {BaseUrlService} from "../../services/base-url.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent extends MultiLingualComponentBase {

  public githubPath:string = BaseUrlService.authBaseUrl + '/external-login/github';


  constructor(private i18Svc:InternationalizationService) {
    super(i18Svc);
  }

}
