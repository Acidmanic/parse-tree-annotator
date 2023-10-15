import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'popper-limited-text',
  templateUrl: './popper-limited-text.component.html',
  styleUrls: ['./popper-limited-text.component.scss']
})
export class PopperLimitedTextComponent implements OnInit{


  @Input('text') text: string = '';
  @Input('text-max-chars') textMaxChars: number = 35;
  @Output('text-click') textClickEmitter:EventEmitter<any>=new EventEmitter<any>();


  public viewingText:string='';
  public isShortened:boolean=false;

  public ngOnInit() {

    if(this.text.length > this.textMaxChars){

      this.viewingText = this.text.substring(0,this.textMaxChars);
      this.isShortened = true;
    }else{
      this.viewingText = this.text;
      this.isShortened = false;
    }

  }

}
