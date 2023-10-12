import {Component, OnInit} from '@angular/core';
import {TokenGroupModel} from "./models/token-group.model";
import {TokenProcessorService} from "./services/token-processor.service";
import {TokenSelectionModel} from "./models/token-selection.model";
import {TokenSelectionProcessorService} from "./services/token-selection-processor.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{




  public group:TokenGroupModel=new TokenGroupModel();

  public selection:TokenSelectionModel = new TokenSelectionModel();

  constructor(private tokenSvc:TokenProcessorService,private selectionSvc:TokenSelectionProcessorService) {
  }


  ngOnInit() {

    this.group = new TokenGroupModel();
    this.group.id = this.tokenSvc.generateGroupId();
    this.group.tag='TOP'
    this.group.tokens.push({text:'This',index:0});
    this.group.tokens.push({text:'Is',index:1});
    this.group.tokens.push({text:'A',index:2});
    this.group.tokens.push({text:'Book',index:3});

    this.tokenSvc.subGroup(this.group,[0],'AR')
    this.tokenSvc.subGroup(this.group,[1],'VB')
    this.tokenSvc.subGroup(this.group,[2,3],'SB')

    this.tokenSvc.subGroup(this.group.children[2],[2],'AR');
    //this.tokenSvc.subGroup(this.group.children[2],[3],'SB');
    //
    // this.selection.groupId=0;
    // this.selection.selectedIds=[2];
    //
    // console.log('the group',this.group);
    // console.log('the selection',this.selection);
    //
    //
    //
    // let  meta = this.selectionSvc.getMetaData(this.selection);
    //
    // console.log('the meta',meta);
    //
    // console.log('the selection shit 0',meta.selectedSet.has(0));
    // console.log('the selection shit 2',meta.selectedSet.has(2));
  }


}
