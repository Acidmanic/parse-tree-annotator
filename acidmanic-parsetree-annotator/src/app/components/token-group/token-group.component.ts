import {Component, Input} from '@angular/core';
import {TokenGroupModel} from "../../models/token-group.model";

@Component({
  selector: 'token-group',
  templateUrl: './token-group.component.html',
  styleUrls: ['./token-group.component.scss']
})
export class TokenGroupComponent {


  @Input('group') group:TokenGroupModel=new TokenGroupModel();



}
