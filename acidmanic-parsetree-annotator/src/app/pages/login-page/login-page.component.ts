import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {InternationalizationService} from "../../services/internationalization.service";
import {MultiLingualComponentBase} from "../../components/multi-lingual-component-base";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent extends MultiLingualComponentBase{

  public githubPath:string = "https://github.com/login/oauth/authorize?client_id="+"f52235de4632fa707792";



  constructor(private i18Svc:InternationalizationService) {
    super(i18Svc);
  }

}
