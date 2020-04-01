import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxBasicComponent } from './checkbox-basic.component';

describe('CheckboxBasicComponent', () => {
  let component: CheckboxBasicComponent;
  let fixture: ComponentFixture<CheckboxBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckboxBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
