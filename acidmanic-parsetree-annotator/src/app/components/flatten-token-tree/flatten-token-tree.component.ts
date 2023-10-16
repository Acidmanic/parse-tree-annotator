import {
  AfterContentInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
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
import {end} from "@popperjs/core";


declare var LeaderLine: any;

@Component({
  selector: 'flatten-token-tree',
  templateUrl: './flatten-token-tree.component.html',
  styleUrls: ['./flatten-token-tree.component.scss']
})
export class FlattenTokenTreeComponent implements OnChanges, OnInit, AfterContentInit {

  @Input('group') group: TokenGroupModel = new TokenGroupModel();
  @Input('selection') selectionInput: TokenSelectionModel = new TokenSelectionModel();
  @Output('on-tag-clicked') onTagClicked: EventEmitter<TokenGroupModel> = new EventEmitter<TokenGroupModel>();
  @Input('disable-tag-click') disableTagClick: boolean = false;

  public levels: FlatTreeLevelModel[] = [];

  private lastSignature: string = '';

  private linesByEndIndex: Map<number,any> = new Map<number, any>();
  private elementsByGroupIds: Map<number, ElementRef> = new Map<number, ElementRef>();
  private startPointsByEndPoints: Map<number, number> = new Map<number, number>();


  constructor(public groupProcessor: TokenProcessorService) {
  }


  ngOnChanges(changes: SimpleChanges) {

    console.log('change called for', changes);

    //this.refresh();

  }

  ngOnInit() {

    console.log('init called');

    //this.refresh();
  }


  onChildCircleReady(gl: GroupElement) {

    if (this.elementsByGroupIds.has(gl.group.id)) {

      console.log('received the element twice, but why?',gl);

      this.elementsByGroupIds.delete(gl.group.id);

    }

    this.elementsByGroupIds.set(gl.group.id, gl.element);

    // let endId =gl.group.id;
    //
    // if(this.startPointsByEndPoints.has(endId)){
    //
    //   let startId = this.startPointsByEndPoints.get(endId)!;
    //
    //   this.renderLine(startId,endId);
    //
    // }

    if (this.allNodesInitialized()) {

      this.renderAllLines();
    }
  }


  private refresh(): void {

    console.log('refresh called');

    this.removePreviousLines();

    this.elementsByGroupIds.clear();

    this.startPointsByEndPoints.clear();

    this.updateLevels();

    console.log('children element status', this.elementsByGroupIds);


  }


  private updateLevels(): void {

    //let tokenAndGroupByIdMap = this.groupProcessor.mapTokenGroup(this.group);

    let flatLevels: FlatTreeLevelModel[] = [];

    this.exploreInsertFlatten(this.group, flatLevels, 0);


    this.calculateLinesTerminals(flatLevels);

    this.levels = flatLevels;

    console.log('levels updated', this.levels);
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


  public cheatSignature(): string {

    let currentSignature = this.groupProcessor.groupSignature(this.group);

    if (this.lastSignature != currentSignature) {

      this.lastSignature = currentSignature;

      this.refresh();
    }

    return currentSignature;
  }

  private removePreviousLines() {

    for (const line of this.linesByEndIndex.values()) {

      console.log('removing existing line:', line);

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

    console.log('drawing line from ' + startId + ' to ' + endId, 'start:', start, 'end: ', end);

    if (start && end) {

      //const line = new LeaderLine(start, end);
      const line = new LeaderLine(
        LeaderLine.pointAnchor(start, {x: '50%', y: '100%'}),
        LeaderLine.pointAnchor(end, {x: '50%', y: '0%'}));

      line.path = 'straight';

      this.linesByEndIndex.set(endId, line);
    }
  }


  ngAfterContentInit() {

    console.log('ngAfterContentInit', this.elementsByGroupIds);


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

    console.log('all nodes initialized', this.elementsByGroupIds, this.startPointsByEndPoints);

    for (const endId of this.startPointsByEndPoints.keys()) {


      let startId = this.startPointsByEndPoints.get(endId)!;

      this.renderLine(startId, endId);

    }

  }

  onNodeDestroy(circleNode: ElementRef, placeHolder: TokenGroupPlaceholderModel) {


    console.log('node destroyed',placeHolder,circleNode);

    if(placeHolder.groupContained && placeHolder.group){


      let id = placeHolder.group.id;

      console.log('found destroyed group:', id,this.linesByEndIndex);

      if(this.linesByEndIndex.has(id)){

        console.log('removing line for ',placeHolder);

        this.linesByEndIndex.get(id)!.remove();

        this.linesByEndIndex.delete(id);
      }

    }



  }
}
