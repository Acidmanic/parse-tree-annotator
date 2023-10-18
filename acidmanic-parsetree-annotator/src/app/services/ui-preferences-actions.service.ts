import {Injectable} from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class UiPreferencesActionsService {





  public setTheme(id:string){
    document.documentElement.setAttribute('data-bs-theme',id);
  }
}
