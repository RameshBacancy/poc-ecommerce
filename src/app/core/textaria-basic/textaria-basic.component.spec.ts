import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextariaBasicComponent } from './textaria-basic.component';

describe('TextariaBasicComponent', () => {
  let component: TextariaBasicComponent;
  let fixture: ComponentFixture<TextariaBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextariaBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextariaBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
