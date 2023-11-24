import { Component } from '@angular/core';
import {LoginManagerService} from "../../services/login-manager.service";

@Component({
  selector: 'user-button',
  templateUrl: './user-button.component.html',
  styleUrls: ['./user-button.component.scss']
})
export class UserButtonComponent {

  constructor(public loginManger:LoginManagerService) {
  }



  public getImage(){

    if(this.loginManger.isLoggedIn()){

      return this.loginManger.getLoggedInUser().avatar;
    }

    return 'assets/images/no-user.svg'
  }


}
