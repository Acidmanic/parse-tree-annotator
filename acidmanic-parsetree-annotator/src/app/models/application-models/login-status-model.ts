import {UserInformationModel} from "../user-information.model";


export class LoginStatusModel {


  public isLoggedIn:boolean = false;
  public currentUser:UserInformationModel=new UserInformationModel();
}
