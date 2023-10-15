import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'span-or-details',
  templateUrl: './span-or-details.component.html',
  styleUrls: ['./span-or-details.component.scss']
})
export class SpanOrDetailsComponent implements OnInit {


  @Input('text') text: string = '';
  @Input('text-max-chars') textMaxChars: number = 35;
  @Input('short-text-chars') shortTextChars: number = Math.round(this.textMaxChars / 2);
  @Input('short-text-postfix') shortTextPostFix: string = '...';

  @Output('span-click') spanClickEmitter:EventEmitter<any>=new EventEmitter<any>();

  public useDetails: boolean = false;
  public summaryText: string = '';


  public ngOnInit() {

    if (this.text.length > this.textMaxChars) {

      this.useDetails = true;
      this.summaryText = this.text.substring(0, this.shortTextChars);

    }else{
      this.useDetails = false;
    }

  }

}
