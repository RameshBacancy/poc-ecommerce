import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleLineChartComponent } from './single-line-chart.component';

describe('SingleLineChartComponent', () => {
  let component: SingleLineChartComponent;
  let fixture: ComponentFixture<SingleLineChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleLineChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
