import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxMultipleComponent } from './checkbox-multiple.component';

describe('CheckboxMultipleComponent', () => {
  let component: CheckboxMultipleComponent;
  let fixture: ComponentFixture<CheckboxMultipleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckboxMultipleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
