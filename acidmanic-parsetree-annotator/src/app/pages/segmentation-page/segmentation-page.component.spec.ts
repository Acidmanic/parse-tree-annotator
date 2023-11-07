import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentationPageComponent } from './segmentation-page.component';

describe('SegmentationPageComponent', () => {
  let component: SegmentationPageComponent;
  let fixture: ComponentFixture<SegmentationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SegmentationPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SegmentationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
