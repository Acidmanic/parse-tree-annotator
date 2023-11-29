import { Component } from '@angular/core';
import {LoginManagerService} from "../../services/login-manager.service";
import {Router} from "@angular/router";
import {MultiLingualComponentBase} from "../multi-lingual-component-base";
import {InternationalizationService} from "../../services/internationalization.service";

@Component({
  selector: 'user-button',
  templateUrl: './user-button.component.html',
  styleUrls: ['./user-button.component.scss']
})
export class UserButtonComponent extends MultiLingualComponentBase{

  constructor(public loginManger:LoginManagerService,
              public router:Router,
              public strings:InternationalizationService) {
    super(strings);
  }



  public getImage(){

    if(this.loginManger.isLoggedIn()){

      return this.loginManger.getLoggedInUser().avatar;
    }

    return 'assets/images/no-user.svg'
  }


  public doLogOut() {

  }
}
