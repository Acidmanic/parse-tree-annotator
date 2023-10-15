import {Component, Input} from '@angular/core';
import {Highlight, HighlightIntensity} from "../../models/token-selection.model";
import {TokenGroupModel} from "../../models/token-group.model";
import {TokenModel} from "../../models/token.model";

@Component({
  selector: 'phrase-highlighter',
  templateUrl: './phrase-highlighter.component.html',
  styleUrls: ['./phrase-highlighter.component.scss']
})
export class PhraseHighlighterComponent {

  @Input('selected-tokens') selectedTokens: TokenModel[] = [];
  @Input('root') root: TokenGroupModel = new TokenGroupModel();
  @Input('highlight-color') highlightColor: Highlight = "warning";
  @Input('highlight-intensity') highlightIntensity: HighlightIntensity = "normal";


  public highlightStyle(tokenIndex: number) {

    for (const token of this.selectedTokens) {

      if (token.index == tokenIndex) {

        let css = 'bg-' + this.highlightColor;

        if(this.highlightIntensity=="normal"){

          if(this.highlightColor == "light" ||
            this.highlightColor == "secondary" ||
            this.highlightColor == "warning"
          ){

            css += ' text-dark';
          }else{

            css += ' text-light';
          }

        }else{
          css   += '-subtle';
        }

        return css;
      }
    }

    return '';
  }


}
