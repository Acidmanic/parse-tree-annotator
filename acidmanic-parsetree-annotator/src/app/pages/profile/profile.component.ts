import { Component } from '@angular/core';
import {MultiLingualComponentBase} from "../../components/multi-lingual-component-base";
import {InternationalizationService} from "../../services/internationalization.service";

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends MultiLingualComponentBase{


  constructor(public strings:InternationalizationService) {
    super(strings);
  }
}
