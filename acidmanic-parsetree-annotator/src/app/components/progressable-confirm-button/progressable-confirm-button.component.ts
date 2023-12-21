import {
  AfterViewInit,
  Component,
  ElementRef, EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';

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


  public textBg:string='text-bg-secondary';
  public cursorClass:string='';
  private clickable :boolean=false;

  @Output('on-click') clickEmitter:EventEmitter<any> = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {

    if(changes){

      if(changes['progressValue'] ){

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

    this.clickable = this.progressValue >= 100;
    this.textBg = this.clickable? 'text-bg-success':'text-bg-secondary';
    this.cursorClass = this.clickable? 'cursor-pointer':'';

    if (this.circle) {

      if (this.circle.nativeElement) {

        const context = this.circle.nativeElement.getContext("2d");

        const offset = Math.PI*3/2;

        if (context) {

          context.clearRect(0, 0, this.circle.nativeElement.width, this.circle.nativeElement.height);

          context.beginPath();
          context.arc(50, 50, 40, 0, Math.PI*2 );
          context.lineWidth = 20;
          context.strokeStyle="#697368";
          context.stroke();
          context.closePath();

          context.beginPath();
          context.arc(50, 50, 40, offset, offset+ (this.progressValue/50) * Math.PI);
          context.lineWidth = 20;
          context.strokeStyle="#55c022";
          context.stroke();
          context.closePath();

        }
      }
    }
  }

  public onClick(){

    if(this.clickable){
      this.clickEmitter.emit({});
    }
  }
}
