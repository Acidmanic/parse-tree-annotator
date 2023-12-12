import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TokenGroupModel} from "../../models/token-group.model";
import {TokenSelectionModel} from "../../models/token-selection.model";
import {PosTagBankModel} from "../../models/pos-tag-bank.model";
import {TokenProcessorService} from "../../services/token-processor.service";
import {TokenSelectionProcessorService} from "../../services/token-selection-processor.service";
import {ParseTreeExtractorService} from "../../services/parse-tree-extractor.service";
import {TreeBankApiService} from "../../services/api-services/tree-bank-api.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PariModel} from "../../models/pari.model";
import {TokenModel} from "../../models/token.model";
import {PosTagModel} from "../../models/pos-tag.model";
import {DataSourceApiService} from "../../services/api-services/data-source-api.service";

@Component({
  selector: 'parse-tree-page',
  templateUrl: './parse-tree-page.component.html',
  styleUrls: ['./parse-tree-page.component.scss']
})
export class ParseTreePageComponent implements OnInit {


  public group: TokenGroupModel = new TokenGroupModel();
  public selection: TokenSelectionModel = new TokenSelectionModel();
  public parseTree: string = '';
  public postagBank: PosTagBankModel = new PosTagBankModel();


  @ViewChild('postagModal') treebankModal?: ElementRef;

  public clickedTagGroup: TokenGroupModel | undefined;
  public modalPreviewGroup?: TokenGroupModel;
  public clickedTagSelection: TokenSelectionModel = new TokenSelectionModel();

  constructor(private tokenSvc: TokenProcessorService,
              private selectionSvc: TokenSelectionProcessorService,
              private parseTreeSvc: ParseTreeExtractorService,
              private pennSvc: TreeBankApiService,
              private modalService: NgbModal,
              private dataSourceApiService:DataSourceApiService) {
  }


  ngOnInit() {

    this.pennSvc.getTreeBankByModelName('farsi').subscribe({
      next: bank => this.postagBank = bank,
      error: err => {
      },
      complete: () => {
      }
    });

    this.dataSourceApiService.fetchSentence('fa').subscribe({
      next: sentence => this.putTokensIntoGroupViewModel(sentence.value?.tokens!)
    });

  }


  private putTokensIntoGroupViewModel(tokens:string[]){

    let g = new TokenGroupModel();
    g.id = this.tokenSvc.generateGroupId();
    g.tag = 'TOP'
    g.root = g;

    let index =0;

    for (const tokenText of tokens) {

      g.tokens.push({text: tokenText, index: index});

      index++;
    }
    g.firstTokenId = 0;

    this.group = g;

    this.updateParseTree();
  }


  public checkSelectionCache() {

    let cache = this.selectionSvc.processSelectionState(this.group, this.selection);

  }

  onCreateSubGroup(subGroupOrder: PariModel<TokenGroupModel, number[]>) {

    let selectedGroup = this.selectionSvc.selectedSubGroup(this.group, this.selection);

    let sub = this.tokenSvc.subGroup(subGroupOrder.first, subGroupOrder.second, '?');

    if (sub.success) {

      this.selection.selectionGroupId = sub.value!.id;

      this.updateParseTree();
    }

  }

  public onDeleteTokens(tokens: PariModel<TokenGroupModel, TokenModel>[]) {

    let deleted = this.tokenSvc.deleteTokens(tokens);

    if (deleted) {

      this.selection.selectionGroupId = -1;

      this.updateParseTree();
    }
  }

  public onDeleteGroup(group: TokenGroupModel) {

    let parent = group.parent;

    if (parent) {

      let deleted = this.tokenSvc.deleteSubGroup(parent, group);

      if (deleted) {

        this.selection.selectionGroupId = -1;

        this.updateParseTree();
      }
    }
  }

  private updateParseTree() {

    this.parseTree = this.parseTreeSvc.toParseTree(this.group);
  }

  public onTagClicked(group: TokenGroupModel) {


    this.clickedTagGroup = group;

    this.modalPreviewGroup = this.tokenSvc.shallowClone(group);

    this.clickedTagSelection = new TokenSelectionModel();

    this.clickedTagSelection.highlightedGroups.set(this.clickedTagGroup.id, "success");

    this.modalService.open(this.treebankModal, {size: 'xl'});
  }


  public onSetPostagClicked(tag: PosTagModel) {


    if (this.clickedTagGroup) {

      this.modalService.dismissAll();

      this.clickedTagGroup.tag = tag.tag;

      this.clickedTagGroup = undefined;

      this.updateParseTree();
    }

  }
}
