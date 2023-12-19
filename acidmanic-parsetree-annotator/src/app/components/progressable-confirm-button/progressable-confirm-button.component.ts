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

        const ctx = this.circle.nativeElement.getContext("2d");

        if (ctx) {

          ctx.beginPath();
          ctx.arc(50, 50, 40, 0, (this.progressValue/50) * Math.PI);
          ctx.lineWidth = 20;
          ctx.strokeStyle="#55c022";
          ctx.stroke();
        }
      }
    }

  }
}
