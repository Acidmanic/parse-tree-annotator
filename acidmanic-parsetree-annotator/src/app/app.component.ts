import {Component, OnInit} from '@angular/core';
import {TokenGroupModel} from "./models/token-group.model";
import {TokenProcessorService} from "./services/token-processor.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{




  public group:TokenGroupModel=new TokenGroupModel();


  constructor(private tokenSvc:TokenProcessorService) {
  }


  ngOnInit() {

    this.group = new TokenGroupModel();
    this.group.tag='TOP'
    this.group.tokens.push({text:'This',index:0});
    this.group.tokens.push({text:'Is',index:1});
    this.group.tokens.push({text:'A',index:2});
    this.group.tokens.push({text:'Book',index:3});

    console.log(this.group);

    this.tokenSvc.subGroup(this.group,[0],'AR')
    this.tokenSvc.subGroup(this.group,[1],'VB')
    this.tokenSvc.subGroup(this.group,[2,3],'SB')

    console.log(this.group);

    this.tokenSvc.subGroup(this.group.children[2],[2],'AR');
    this.tokenSvc.subGroup(this.group.children[2],[3],'SB');

    console.log(this.group);
  }


}
