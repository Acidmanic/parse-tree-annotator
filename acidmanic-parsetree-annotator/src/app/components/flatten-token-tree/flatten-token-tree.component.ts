import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {TokenGroupModel} from "../../models/token-group.model";
import {TokenSelectionModel} from "../../models/token-selection.model";
import {TokenGroupPlaceholderModel} from "../../models/token-group-placeholder.model";
import {FlatTreeLevelModel} from "../../models/flat-tree-level.model";
import {TokenProcessorService} from "../../services/token-processor.service";
import {GroupElement} from "../../models/group.element";

@Component({
  selector: 'flatten-token-tree',
  templateUrl: './flatten-token-tree.component.html',
  styleUrls: ['./flatten-token-tree.component.scss']
})
export class FlattenTokenTreeComponent implements OnChanges, OnInit {

  @Input('group') group: TokenGroupModel = new TokenGroupModel();
  @Input('selection') selectionInput: TokenSelectionModel = new TokenSelectionModel();
  @Output('on-tag-clicked') onTagClicked: EventEmitter<TokenGroupModel> = new EventEmitter<TokenGroupModel>();
  @Input('disable-tag-click') disableTagClick: boolean = false;

  public levels: FlatTreeLevelModel[] = [];

  private lastSignature: string = '';

  private lines: any[] = [];
  private elementsByGroupIds: Map<number, ElementRef> = new Map<number, ElementRef>();

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

      this.elementsByGroupIds.delete(gl.group.id);

    }

    this.elementsByGroupIds.set(gl.group.id, gl.element);

  }


  private refresh(): void {

    console.log('refresh called');

    this.updateLevels();


    console.log('children element status',this.elementsByGroupIds);
  }


  private updateLevels(): void {

    //let tokenAndGroupByIdMap = this.groupProcessor.mapTokenGroup(this.group);

    let flatLevels: FlatTreeLevelModel[] = [];

    this.exploreInsertFlatten(this.group, flatLevels, 0);

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

    let firstToken = this.groupProcessor.findByIndex(group.root!,group.firstTokenId).value!;

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
}
