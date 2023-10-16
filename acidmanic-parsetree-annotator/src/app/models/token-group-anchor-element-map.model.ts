import {ElementRef} from "@angular/core";
import {GroupElement} from "./group.element";
import {TokenGroupModel} from "./token-group.model";
import {TokenGroupMapModel} from "./token-group-map.model";
import {Observable, Subject} from "rxjs";


export class TokenGroupAnchorElementMapModel {


  private map: Map<number, ElementRef> = new Map<number, ElementRef>();
  private updatesSubject: Subject<TokenGroupModel> = new Subject<TokenGroupModel>();

  private static readonly noGroups: TokenGroupModel = {
    tokens: [],
    tag: '',
    id: -1,
    firstTokenId: -1,
    children: []
  };

  public register(group: TokenGroupModel, element: ElementRef) {

    if (!this.map.has(group.id)) {

      this.map.set(group.id, element);

      this.updatesSubject.next(group.parent ?? TokenGroupAnchorElementMapModel.noGroups);
    }
  }


  public unregister(group: TokenGroupModel) {

    if(this.map.has(group.id)){

      this.map.delete(group.id);

      this.updatesSubject.next(group.parent ?? TokenGroupAnchorElementMapModel.noGroups);
    }
  }

  public updates():Observable<TokenGroupModel>{

    return this.updatesSubject;
  }

  public get(group: TokenGroupModel):ElementRef {

    return this.map.get(group.id)!;
  }
}
