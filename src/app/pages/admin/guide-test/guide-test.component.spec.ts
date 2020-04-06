import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuideTestComponent } from './guide-test.component';

describe('GuideTestComponent', () => {
  let component: GuideTestComponent;
  let fixture: ComponentFixture<GuideTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuideTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuideTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
