import { Component } from '@angular/core';
import {LoginManagerService} from "../../services/login-manager.service";
import {Router} from "@angular/router";

@Component({
  selector: 'user-button',
  templateUrl: './user-button.component.html',
  styleUrls: ['./user-button.component.scss']
})
export class UserButtonComponent {

  constructor(public loginManger:LoginManagerService,
              public router:Router) {
  }



  public getImage(){

    if(this.loginManger.isLoggedIn()){

      return this.loginManger.getLoggedInUser().avatar;
    }

    return 'assets/images/no-user.svg'
  }


  public menuClicked() {

    if(this.loginManger.isLoggedIn()){
      this.showMenu();
    }else{
      this.router.navigate(['login']);
    }

  }


  private showMenu(){


  }
}
