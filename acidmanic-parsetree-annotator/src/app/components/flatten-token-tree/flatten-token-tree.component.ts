import {
  AfterContentInit,
  Component,
  ElementRef,
  EventEmitter, HostListener,
  Input,
  OnChanges, OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {TokenGroupModel} from "../../models/token-group.model";
import {TokenSelectionModel} from "../../models/token-selection.model";
import {TokenGroupPlaceholderModel} from "../../models/token-group-placeholder.model";
import {FlatTreeLevelModel} from "../../models/flat-tree-level.model";
import {TokenProcessorService} from "../../services/token-processor.service";
import {GroupElement} from "../../models/group.element";
import {PariModel} from "../../models/pari.model";
import {TokenModel} from "../../models/token.model";
import {TokenSelectionCacheModel} from "../../models/token-selection-cache.model";
import {TokenSelectionProcessorService} from "../../services/token-selection-processor.service";
import {InternationalizationService} from "../../services/internationalization.service";
import {Subscription} from "rxjs";


declare var LeaderLine: any;

@Component({
  selector: 'flatten-token-tree',
  templateUrl: './flatten-token-tree.component.html',
  styleUrls: ['./flatten-token-tree.component.scss']
})
export class FlattenTokenTreeComponent implements OnChanges, OnInit, AfterContentInit, OnDestroy {

  @Input('group') group: TokenGroupModel = new TokenGroupModel();
  @Input('selection') selectionInput: TokenSelectionModel = new TokenSelectionModel();
  @Output('on-tag-clicked') onTagClicked: EventEmitter<TokenGroupModel> = new EventEmitter<TokenGroupModel>();
  @Input('disable-tag-click') disableTagClick: boolean = false;
  @Input('token-z-index') tokenZIndex?: number;


  @Output('on-delete-group') onDeleteGroup: EventEmitter<TokenGroupModel> = new EventEmitter<TokenGroupModel>();
  @Output('on-delete-tokens') onDeleteTokens: EventEmitter<PariModel<TokenGroupModel, TokenModel>[]> = new EventEmitter<PariModel<TokenGroupModel, TokenModel>[]>();
  @Output('on-sub-group') onSubGroup: EventEmitter<PariModel<TokenGroupModel, number[]>> = new EventEmitter<PariModel<TokenGroupModel, number[]>>();

  public levels: FlatTreeLevelModel[] = [];

  private lastGroupSignature: string = '';
  private lastSelectionSignature: string = '';

  private linesByEndIndex: Map<number, any> = new Map<number, any>();
  private elementsByGroupIds: Map<number, ElementRef> = new Map<number, ElementRef>();
  private startPointsByEndPoints: Map<number, number> = new Map<number, number>();


  public selectionStateCache: TokenSelectionCacheModel = new TokenSelectionCacheModel();
  public selectionStateCacheBroadcast: EventEmitter<TokenSelectionCacheModel> = new EventEmitter<TokenSelectionCacheModel>();

  private internationalizationSubscription?:Subscription;

  constructor(public groupProcessor: TokenProcessorService,
              private selectionProcessor: TokenSelectionProcessorService,
              private elementRef: ElementRef,
              private svcInternationalization:InternationalizationService) {
  }


  ngOnChanges(changes: SimpleChanges) {

  }

  ngOnInit() {

    this.internationalizationSubscription = this.svcInternationalization.languageChange()
      .subscribe({
        next:lan => this.refresh()
      });
  }

  ngOnDestroy() {

    if(this.internationalizationSubscription){

      this.internationalizationSubscription.unsubscribe();
    }
  }

  onChildCircleReady(gl: GroupElement) {

    if (this.elementsByGroupIds.has(gl.group.id)) {

      this.elementsByGroupIds.delete(gl.group.id);

    }

    this.elementsByGroupIds.set(gl.group.id, gl.element);

    if (this.allNodesInitialized()) {

      this.renderAllLines();

      this.reCalculateSelection();
    }
  }


  private refresh(): void {

    this.removePreviousLines();

    this.elementsByGroupIds.clear();

    this.startPointsByEndPoints.clear();

    this.updateLevels();


  }


  private updateLevels(): void {

    let flatLevels: FlatTreeLevelModel[] = [];

    this.exploreInsertFlatten(this.group, flatLevels, 0);


    this.calculateLinesTerminals(flatLevels);

    this.levels = flatLevels;

  }

  private createEmptyLevel(root: TokenGroupModel, atLevel: number): FlatTreeLevelModel {

    let l = new FlatTreeLevelModel();

    l.levelIndex = atLevel;

    for (let i = 0; i < root.tokens.length; i++) {

      let p = new TokenGroupPlaceholderModel();

      p.text = root.tokens[i].text;

      l.placeHolders.push(p)
    }

    return l;
  }

  private exploreInsertFlatten(group: TokenGroupModel, flatLevels: FlatTreeLevelModel[], currentLevel: number) {

    while (!(currentLevel < flatLevels.length)) {

      let l = this.createEmptyLevel(group.root!, flatLevels.length);

      flatLevels.push(l);
    }

    let level = flatLevels[currentLevel];

    let firstToken = this.groupProcessor.findByIndex(group.root!, group.firstTokenId).value!;

    level.placeHolders[group.firstTokenId].group = group;
    level.placeHolders[group.firstTokenId].groupContained = true;


    for (const child of group.children) {

      this.exploreInsertFlatten(child, flatLevels, currentLevel + 1);
    }

  }


  public cheatGroupSignature(): string {

    let currentSignature = this.groupProcessor.groupSignature(this.group);

    if (this.lastGroupSignature != currentSignature) {

      this.lastGroupSignature = currentSignature;

      this.refresh();
    }

    return currentSignature;
  }

  public cheatSelectionSignature(): string {

    let currentSignature = this.selectionProcessor.selectionSignature(this.selectionInput);

    if (this.lastSelectionSignature != currentSignature) {

      this.lastSelectionSignature = currentSignature;

      this.reCalculateSelection();
    }

    return currentSignature;
  }

  private removePreviousLines() {

    for (const line of this.linesByEndIndex.values()) {

      line.remove();
    }

    this.linesByEndIndex.clear();
  }

  private calculateLinesTerminals(levels: FlatTreeLevelModel[]) {

    for (const level of levels) {

      for (const placeHolder of level.placeHolders) {

        if (placeHolder.groupContained) {

          let startGroup = placeHolder.group!;

          for (const child of startGroup.children) {

            this.startPointsByEndPoints.set(child.id, startGroup.id);

          }
        }
      }
    }

  }

  private renderLine(startId: number, endId: number): void {

    let start = this.elementsByGroupIds.get(startId)?.nativeElement;

    let end = this.elementsByGroupIds.get(endId)?.nativeElement;

    if (start && end) {

      const line = new LeaderLine(
        LeaderLine.pointAnchor(start, {x: '50%', y: '100%'}),
        LeaderLine.pointAnchor(end, {x: '50%', y: '0%'}));

      line.path = 'straight';

      line.setOptions({
        startPlug: 'disc'
      });

      this.linesByEndIndex.set(endId, line);
    }
  }


  ngAfterContentInit() {

  }

  private allNodesInitialized(): boolean {

    for (const start of this.startPointsByEndPoints.values()) {
      if (!this.elementsByGroupIds.has(start)) {

        return false;
      }
    }

    for (const end of this.startPointsByEndPoints.keys()) {

      if (!this.elementsByGroupIds.has(end)) {

        return false;
      }
    }

    return true;

  }

  private renderAllLines() {

    for (const endId of this.startPointsByEndPoints.keys()) {


      let startId = this.startPointsByEndPoints.get(endId)!;

      this.renderLine(startId, endId);

    }

  }

  onNodeDestroy(circleNode: ElementRef, placeHolder: TokenGroupPlaceholderModel) {

    if (placeHolder.groupContained && placeHolder.group) {


      let id = placeHolder.group.id;

      if (this.linesByEndIndex.has(id)) {

        this.linesByEndIndex.get(id)!.remove();

        this.linesByEndIndex.delete(id);
      }

    }

  }

  public reCalculateSelection() {

    this.selectionStateCache = this.selectionProcessor.processSelectionState(this.group, this.selectionInput);

    this.selectionStateCacheBroadcast.emit(this.selectionStateCache);
  }


  public deselectEveryThing() {

    this.selectionInput = new TokenSelectionModel();

    this.reCalculateSelection();
  }

  @HostListener('document:click', ['$event'])
  onHostClick(event: any) {

    if (this.elementRef && this.elementRef.nativeElement && !this.elementRef.nativeElement.contains(event.target)) {

      this.deselectEveryThing();
    }
  }

}
