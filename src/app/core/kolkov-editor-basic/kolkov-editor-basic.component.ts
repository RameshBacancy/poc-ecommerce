import { Component, OnInit, Input } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-kolkov-editor-basic',
  templateUrl: './kolkov-editor-basic.component.html',
  styleUrls: ['./kolkov-editor-basic.component.scss']
})
export class KolkovEditorBasicComponent implements OnInit {
  @Input() public group?: FormGroup;
  @Input() public name: string;
  @Input() public label?: string;
  @Input() public placeholder?: string;
  @Input() public disabled?: boolean;
  @Input() boxWidth = '100%'; // Input box width
  @Input() marginBottom = '20px'; // Input margin on bottom

  //for editor configuration
  config: AngularEditorConfig;

  constructor() { }

  ngOnInit() {
    this.config = {
      editable: true,
      spellcheck: true,
      height: '15rem',
      minHeight: '15rem',
      placeholder: this.placeholder,
      translate: 'no',
      defaultParagraphSeparator: 'p',
      defaultFontName: 'Arial',
      toolbarHiddenButtons: [
        ['bold']
      ],
      customClasses: [
        {
          name: "quote",
          class: "quote",
        },
        {
          name: 'redText',
          class: 'redText'
        },
        {
          name: "titleText",
          class: "titleText",
          tag: "h1",
        },
      ]
    };

  }

  public onChange = (value: any) => { };
  public registerOnTouched = (fn: any) => { };
  public writeValue = (value: any) => this.onChange(value);
  public registerOnChange = (fn: (val: any) => void) => this.onChange = fn;


}
