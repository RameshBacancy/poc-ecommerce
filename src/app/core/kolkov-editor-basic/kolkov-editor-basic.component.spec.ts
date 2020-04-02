import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KolkovEditorBasicComponent } from './kolkov-editor-basic.component';

describe('KolkovEditorBasicComponent', () => {
  let component: KolkovEditorBasicComponent;
  let fixture: ComponentFixture<KolkovEditorBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KolkovEditorBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KolkovEditorBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
