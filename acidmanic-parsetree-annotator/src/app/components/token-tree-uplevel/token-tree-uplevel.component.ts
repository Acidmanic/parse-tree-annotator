import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {TokenGroupModel} from "../../models/token-group.model";
import {TokenSelectionModel} from "../../models/token-selection.model";
import {TokenGroupAnchorElementMapModel} from "../../models/token-group-anchor-element-map.model";
import {Subscription} from "rxjs";

declare var LeaderLine: any;

@Component({
  selector: 'token-tree-uplevel',
  templateUrl: './token-tree-uplevel.component.html',
  styleUrls: ['./token-tree-uplevel.component.scss']
})
export class TokenTreeUplevelComponent implements OnInit,OnDestroy{


  @Input('group') group: TokenGroupModel = new TokenGroupModel();
  @Input('selection') selectionInput: TokenSelectionModel = new TokenSelectionModel();
  @Output('on-tag-clicked') onTagClicked: EventEmitter<TokenGroupModel> = new EventEmitter<TokenGroupModel>();
  @Input('disable-tag-click') disableTagClick: boolean = false;

  public elementsMap:TokenGroupAnchorElementMapModel= new TokenGroupAnchorElementMapModel();

  private lines: any[] = [];

  private groupUpdateSubscription?: Subscription;




  ngOnInit() {

    this.groupUpdateSubscription = this.elementsMap.updates().subscribe({
      next: group => this.groupElementsUpdated(group)
    });

  }

  ngOnDestroy() {

    if (this.groupUpdateSubscription) {

      this.groupUpdateSubscription.unsubscribe();
    }

  }


  private groupElementsUpdated(group: TokenGroupModel) {

    if (group.id == this.group.id) {

      for (const line of this.lines) {
        line.remove();
      }

      let start = this.elementsMap.get(this.group);

      for (const child of this.group.children) {

        let end = this.elementsMap.get(child);

        console.log('drawing line, ', this.group.id, 'start:', start, 'end: ', end);

        if (start && end) {

          const line = new LeaderLine(start, end);

          line.path = 'straight';


          this.lines.push(line);
        }

      }

    }

  }
}
