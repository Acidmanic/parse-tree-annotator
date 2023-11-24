import {Injectable} from "@angular/core";


export class BaseUrlService {

  public static readonly authBaseUrl: string = 'https://localhost:8081';
  public static readonly baseUrl: string = BaseUrlService.authBaseUrl + '/api';
}
