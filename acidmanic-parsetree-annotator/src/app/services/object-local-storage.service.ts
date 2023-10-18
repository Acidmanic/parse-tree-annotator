import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';


/**
 * This service eases saving and loading objects into/from the local
 * storage. It also provides subscriptions for some of these objects
 * when needed.
 */
@Injectable({
  // MUST BE SINGLETON
  providedIn: 'root',
})
export class ObjectLocalStorageService {

  private static cache: Map<string, any> = new Map<string, any>();

  public getData<T>(key: string) {

    if (ObjectLocalStorageService.cache.has(key)) {
      return ObjectLocalStorageService.cache.get(key) as T;
    }

    let value = this.acquireData<T>(key);

    if (value) {

      ObjectLocalStorageService.cache.set(key, value);

    }
    return value;
  }

  public getOrDefault<T>(key: string, defaultValue: T) {

    let value = this.getData<T>(key);

    if (value) {
      return value;
    }
    return defaultValue;
  }

  public getOrDefaultAndSet<T>(key: string, defaultValue: T) {

    let value = this.getData<T>(key);

    if (value) {
      return value;
    }

    this.storeData<T>(key, defaultValue);

    return defaultValue;
  }


  public acquireData<T>(key: string): T {
    const json = localStorage.getItem(key);

    const data: T = json ? JSON.parse(json) : null;

    return data;
  }

  public storeData<T>(key: string, data: T) {

    localStorage.setItem(key, JSON.stringify(data));

    ObjectLocalStorageService.cache.set(key, data);
  }

  public removeData(key: string) {
    localStorage.removeItem(key);
  }
}
