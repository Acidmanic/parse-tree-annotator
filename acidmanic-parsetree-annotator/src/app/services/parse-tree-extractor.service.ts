import {Injectable} from "@angular/core";
import {TokenGroupModel} from "../models/token-group.model";


@Injectable({
  providedIn:'root'
})
export class ParseTreeExtractorService{


  public toParseTree(root:TokenGroupModel):string{

    let parseTree = '(S ';

    for (const child of root.children) {

      parseTree += '\n' + this.parseSubtree(child,1);

    }

    parseTree += '\n(..))';

    return parseTree;
  }

  private indent(level:number):string{

    let ind = '';

    for (let i = 0; i < level; i++) {

      ind += '    ';
    }

    return ind;
  }

  private parseSubtree(node:TokenGroupModel,level:number):string{

    let tree = this.indent(level) + '(' + node.tag + ' ';

    if(this.isSingularLeaf(node)){

      tree += node.tokens[0].text;

    }else{

      for (let i = 0; i < node.children.length; i++) {

        tree += '\n' + this.parseSubtree(node.children[i],level+1);

      }
    }

    tree +=')';

    return tree;
  }


  private isSingularLeaf(node: TokenGroupModel):boolean {

    return node.children.length==0 && node.tokens.length==1;
  }

  private isLeaf(node: TokenGroupModel):boolean {

    return node.children.length==0;
  }

}
