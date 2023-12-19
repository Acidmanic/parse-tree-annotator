import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';

@Component({
  selector: 'progressable-confirm-button',
  templateUrl: './progressable-confirm-button.component.html',
  styles:[
    '.circular-prog-fill-parent-button {width: 80%;height: 80%;position: absolute;left: 10%;top: 10%;}',
    '.circular-prog-fill-parent-prog {width: 100%;height: 100%;position: absolute;left: 0;top: 0;}',
    '.circular-prog-fill-parent-container {position: relative;padding: 0;width:100%;height:100%}',
    '.circular-prog-fill-parent-icon {position: absolute;width: 100%;height: 100%;}',
  ]
})
export class ProgressableConfirmButtonComponent implements AfterViewInit,OnChanges {


  ngOnChanges(changes: SimpleChanges): void {

    if(changes){
      if(changes['progressValue']){
        this.refresh();
      }
    }
  }

  @ViewChild('circle') circle?: ElementRef<HTMLCanvasElement>;

  @Input('progress-value') progressValue:number=0;


  ngAfterViewInit(): void {

    this.refresh();
  }

  private refresh() {


    if (this.circle) {

      if (this.circle.nativeElement) {

        const context = this.circle.nativeElement.getContext("2d");
        const offset = Math.PI*3/2;

        if (context) {

          context.beginPath();
          context.arc(50, 50, 40, offset, offset+ (this.progressValue/50) * Math.PI);
          context.lineWidth = 20;
          context.strokeStyle="#55c022";
          context.stroke();
          context.closePath();

          context.beginPath();
          context.arc(50, 50, 40, offset+ (this.progressValue/50) * Math.PI,offset );
          context.lineWidth = 20;
          context.strokeStyle="#697368";
          context.stroke();
          context.closePath();

        }
      }
    }

  }
}
