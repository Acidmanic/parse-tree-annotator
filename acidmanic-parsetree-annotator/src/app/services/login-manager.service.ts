import {Injectable} from "@angular/core";
import {LoginStatusModel} from "../models/application-models/login-status-model";
import {ObjectLocalStorageService} from "./object-local-storage.service";
import {AccountsApiService} from "./api-services/accounts-api.service";
import {UserInformationModel} from "../models/user-information.model";


@Injectable({
  providedIn: 'root'
})
export class LoginManagerService {

  private static readonly storageKey: string = 'LOGIN_MANAGER_STATUS';
  private static status: LoginStatusModel = new LoginStatusModel();
  private static isStatusLoaded: boolean = false;


  constructor(private storage: ObjectLocalStorageService,
              private accounts: AccountsApiService) {
  }

  private loadIfNotLoaded() {

    if (!LoginManagerService.isStatusLoaded) {

      this.loadStatus();
    }

  }

  private loadStatus() {
    LoginManagerService.status = this.storage.getOrDefaultAndSet('LOGIN_MANAGER_STATUS', new LoginStatusModel());
    LoginManagerService.isStatusLoaded = true;
  }

  private updateStorageRecord(user: UserInformationModel, isLoggedIn: boolean) {
    LoginManagerService.status.currentUser = user;
    LoginManagerService.status.isLoggedIn = isLoggedIn;
    this.storage.storeData(LoginManagerService.storageKey, LoginManagerService.status);
  }

  public isLoggedIn(): boolean {

    this.loadIfNotLoaded();

    return LoginManagerService.status.isLoggedIn;
  }

  public getLoggedInUser(): UserInformationModel {

    return LoginManagerService.status.currentUser;
  }


  public updateThroughBackChannel() {

    this.accounts.getUserInformation().subscribe({
      next: user => {
        this.updateStorageRecord(user, true);
      },
      error: err => {
        this.updateStorageRecord(new UserInformationModel(), false);
      },
      complete: () => {
      }
    });
  }


}
