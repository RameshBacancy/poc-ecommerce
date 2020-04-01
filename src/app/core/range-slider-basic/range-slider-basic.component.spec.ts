import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeSliderBasicComponent } from './range-slider-basic.component';

describe('RangeSliderBasicComponent', () => {
  let component: RangeSliderBasicComponent;
  let fixture: ComponentFixture<RangeSliderBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RangeSliderBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RangeSliderBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
