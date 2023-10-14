import {Component, ElementRef, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {TokenGroupModel} from "./models/token-group.model";
import {TokenProcessorService} from "./services/token-processor.service";
import {TokenSelectionModel} from "./models/token-selection.model";
import {TokenSelectionProcessorService} from "./services/token-selection-processor.service";
import {ParseTreeExtractorService} from "./services/parse-tree-extractor.service";
import {TreeBankApiService} from "./services/api-services/tree-bank-api.service";
import {PosTagBankModel} from "./models/pos-tag-bank.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PosTagModel} from "./models/pos-tag.model";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  public group: TokenGroupModel = new TokenGroupModel();
  public selection: TokenSelectionModel = new TokenSelectionModel();
  public parseTree:string='';
  public postagBank:PosTagBankModel= new PosTagBankModel();


  @ViewChild('postagModal') treebankModal?:ElementRef;

  public clickedTagGroup:TokenGroupModel | undefined;
  public modalPreviewGroup?:TokenGroupModel;
  public clickedTagSelection:TokenSelectionModel=new TokenSelectionModel();

  constructor(private tokenSvc: TokenProcessorService,
              private selectionSvc: TokenSelectionProcessorService,
              private parseTreeSvc:ParseTreeExtractorService,
              private pennSvc:TreeBankApiService,
              private modalService:NgbModal) {
  }


  ngOnInit() {


    this.group = new TokenGroupModel();
    this.group.id = this.tokenSvc.generateGroupId();
    this.group.tag = 'TOP'
    this.group.root = this.group;
    this.group.tokens.push({text: 'This', index: 0});
    this.group.tokens.push({text: 'Is', index: 1});
    this.group.tokens.push({text: 'A', index: 2});
    this.group.tokens.push({text: 'Book', index: 3});


    this.updateParseTree();


    this.pennSvc.getPennTreeBank('farsi').subscribe({
      next: penn => this.postagBank = penn,
      error: err=>{},
      complete: () => {}
    });

  }


  onSubGroupClicked() {

    let selectedGroup = this.selectionSvc.selectedSubGroup(this.group, this.selection);

    let meta = this.selectionSvc.getMetaData(this.group, this.selection);

    console.log('current meta:', meta);

    if (meta.noneSingularLeafedTokensSelected && !meta.singularLeafedTokensSelected) {

      if (selectedGroup.success && !meta.wholeGroupIsSelected) {

        if (this.selection.selectedIds.length > 0) {

          let sub = this.tokenSvc.subGroup(selectedGroup.value!, this.selection.selectedIds, 'SU');

          if (sub.success) {

            this.selection.selectionGroupId = sub.value!.id;

            this.updateParseTree();
          }
        }
      }


    }

  }

  public onDeleteClicked() {

    let selectedGroup = this.selectionSvc.selectedSubGroup(this.group, this.selection);

    if (selectedGroup.success) {

      let meta = this.selectionSvc.getMetaData(this.group, this.selection);

      console.log('meta:', meta);

      if (meta.wholeGroupIsSelected) {

        let parent = (selectedGroup.value?.parent);

        if (parent) {

          let deleted = this.tokenSvc.deleteSubGroup(parent, selectedGroup.value!);

          if (deleted) {

            this.selection.selectionGroupId = -1;

            this.updateParseTree();

          }

        }
      }

    }
  }

  private updateParseTree() {

    this.parseTree = this.parseTreeSvc.toParseTree(this.group);

    console.log('parse-tree',this.parseTree);
  }

  public onTagClicked(group: TokenGroupModel) {


    console.log('pos tag clicked for group: ' + group.id);

    this.clickedTagGroup = group;

    let parentClone =  this.tokenSvc.cloneGroup(group.parent!);

    this.tokenSvc.eraseAscendants(parentClone,1);

    this.modalPreviewGroup = parentClone;

    this.clickedTagSelection = new TokenSelectionModel();

    this.clickedTagSelection.highlightedGroups.set(this.clickedTagGroup.id,"success");

    this.modalService.open(this.treebankModal,{ size: 'xl'});
  }


  public onSetPostagClicked(tag:PosTagModel){


    if(this.clickedTagGroup){

      this.clickedTagGroup.tag = tag.tag;

      this.clickedTagGroup = undefined;

      this.modalService.dismissAll();
    }

  }
}
