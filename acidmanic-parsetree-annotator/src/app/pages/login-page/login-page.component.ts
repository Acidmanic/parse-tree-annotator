import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  public githubPath:string = "https://github.com/login/oauth/authorize?client_id="+"f52235de4632fa707792";



}
