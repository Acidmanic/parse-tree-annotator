import {ElementRef} from "@angular/core";
import {TokenGroupModel} from "./token-group.model";


export class GroupElement {

  public element: ElementRef = new ElementRef<any>(undefined);

  public group: TokenGroupModel = new TokenGroupModel();
}
