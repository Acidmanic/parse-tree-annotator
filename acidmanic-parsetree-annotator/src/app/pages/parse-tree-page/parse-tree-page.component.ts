import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TokenGroupModel} from "../../models/token-group.model";
import {TokenSelectionModel} from "../../models/token-selection.model";
import {PosTagBankModel} from "../../models/pos-tag-bank.model";
import {TokenProcessorService} from "../../services/token-processor.service";
import {TokenSelectionProcessorService} from "../../services/token-selection-processor.service";
import {ParseTreeExtractorService} from "../../services/parse-tree-extractor.service";
import {TreeBankApiService} from "../../services/api-services/tree-bank-api.service";
import {NgbModal, NgbToast} from "@ng-bootstrap/ng-bootstrap";
import {PariModel} from "../../models/pari.model";
import {TokenModel} from "../../models/token.model";
import {PosTagModel} from "../../models/pos-tag.model";
import {DataSourceApiService} from "../../services/api-services/data-source-api.service";
import {SentenceTaskModel} from "../../models/api/sentence-task.model";
import {MultiLingualComponentBase} from "../../components/multi-lingual-component-base";
import {InternationalizationService} from "../../services/internationalization.service";
import {ResultModel} from "../../models/result.model";
import {LanguageModel} from "../../models/language.model";
import {ParsedTreeModel} from "../../models/api/parsed-tree.model";
import {HotToastService} from "@ngneat/hot-toast";
import {ShareopolisToasterService} from "../../services/shareopolis-toaster.service";


@Component({
  selector: 'parse-tree-page',
  templateUrl: './parse-tree-page.component.html',
  styleUrls: ['./parse-tree-page.component.scss']
})
export class ParseTreePageComponent extends MultiLingualComponentBase {


  public group: TokenGroupModel = new TokenGroupModel();
  public selection: TokenSelectionModel = new TokenSelectionModel();
  public parseTree: string = '';
  public postagBank: PosTagBankModel = new PosTagBankModel();
  public groupDirection: string = "ltr";
  public annotationSentence: string = '';
  public progress: number = 0;
  public anySentenceToProcess: boolean = false;

  private currentSentence: ResultModel<SentenceTaskModel> = new ResultModel<SentenceTaskModel>();

  @ViewChild('postagModal') treebankModal?: ElementRef;

  public clickedTagGroup: TokenGroupModel | undefined;
  public modalPreviewGroup?: TokenGroupModel;
  public clickedTagSelection: TokenSelectionModel = new TokenSelectionModel();
  public availableTaskLanguages: LanguageModel[] = [];
  public selectedTaskLanguage = new LanguageModel();

  constructor(private tokenSvc: TokenProcessorService,
              private selectionSvc: TokenSelectionProcessorService,
              private parseTreeSvc: ParseTreeExtractorService,
              private pennSvc: TreeBankApiService,
              private modalService: NgbModal,
              private dataSourceApiService: DataSourceApiService,
              private i18Svc: InternationalizationService,
              private toast: ShareopolisToasterService) {
    super(i18Svc);
  }

  protected override onInitHook() {
    super.onInitHook();

    this.dataSourceApiService.availableLanguages().subscribe({
      next: langs => {

        this.availableTaskLanguages = langs;

        if (langs.length > 0) {
          this.onSelectTaskLanguage(this.availableTaskLanguages[0]);
        }

      }
    });
  }

  private onSentenceResponse(response: ResultModel<SentenceTaskModel>) {

    if (response.success && response.value) {
      this.anySentenceToProcess = true;
      this.putSentenceIntoGroupViewModel(response.value!);
    } else {
      this.anySentenceToProcess = false;
    }
  }


  private putSentenceIntoGroupViewModel(sentence: SentenceTaskModel) {

    let g = new TokenGroupModel();
    g.id = this.tokenSvc.generateGroupId();
    g.tag = 'TOP'
    g.root = g;

    let index = 0;

    for (const tokenText of sentence.tokens) {

      g.tokens.push({text: tokenText, index: index});

      index++;
    }
    g.firstTokenId = 0;

    this.group = g;

    this.groupDirection = sentence.language.direction;

    this.updateParseTree();

    let text = '';
    let sep = '';

    for (const token of sentence.tokens) {
      text += sep + token;
      sep = ' ';
    }
    this.annotationSentence = text;

    this.currentSentence = new ResultModel<SentenceTaskModel>();

    this.currentSentence.value = sentence;

    this.currentSentence.success = true;
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

  onSkipSentenceClicked() {

    if (this.currentSentence.success) {

      this.dataSourceApiService.skipSentence(this.currentSentence.value!.id).subscribe({
        next: sentence => {

          this.onSentenceResponse(sentence);
        }
      });
    } else {
      this.dataSourceApiService.fetchSentence(this.selectedTaskLanguage.shortName).subscribe({
        next: sentence => {
          this.onSentenceResponse(sentence);
        }
      });
    }
  }

  private updateParseTree() {

    this.parseTree = this.parseTreeSvc.toParseTree(this.group);

    let p = this.tokenSvc.getProgress(this.group);

    this.progress = p.hardProgress;
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

  public onSelectTaskLanguage(lang: LanguageModel) {

    this.selectedTaskLanguage = lang;

    this.fetchPristineSentenceForUser();

    this.pennSvc.getTreeBankByLanguage(lang.shortName).subscribe({
      next: bank => this.postagBank = bank,
      error: err => {
      },
      complete: () => {
      }
    });

  }

  public onSubmitClicked() {


    if (this.currentSentence.success && this.currentSentence.value) {

      let parsedTreeData = this.parseTreeSvc.toParseTree(this.group);

      let progress = this.tokenSvc.getProgress(this.group);

      let parsedTreeModel = new ParsedTreeModel();

      parsedTreeModel.parsedTree = parsedTreeData;
      parsedTreeModel.hardProgress = progress.hardProgress;
      parsedTreeModel.softProgress = progress.softProgress;
      parsedTreeModel.languageShortName = this.currentSentence.value!.language.shortName;
      parsedTreeModel.sentenceId = this.currentSentence.value!.id;

      this.dataSourceApiService.deliverSentenceByModel(parsedTreeModel).subscribe({
        next: value => {

          this.toast.creditWon(Math.floor(value.credit));

          this.onSentenceResponse(value);
        },
        error: err => {
          //TODO: Toast error
          this.onSentenceResponse(new ResultModel<SentenceTaskModel>())
          console.log(err);
        },
        complete: () => {
        }
      });
    }


  }

  public onFetchSentenceClicked() {

    this.fetchPristineSentenceForUser();
  }

  private fetchPristineSentenceForUser() {

    if (this.selectedTaskLanguage) {

      this.dataSourceApiService.fetchSentence(this.selectedTaskLanguage.shortName).subscribe({
        next: sentence => {
          this.onSentenceResponse(sentence);
        }
      });
    }

  }
}
