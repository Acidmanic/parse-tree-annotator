import {Component, OnInit} from '@angular/core';
import {LoginManagerService} from "../../services/login-manager.service";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent{



  constructor(public loginManger:LoginManagerService) {

  }

}
