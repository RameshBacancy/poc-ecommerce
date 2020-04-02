import { Component, forwardRef, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
export type errorType = 'ng-touched ng-pristine ng-invalid' | 'test';
@Component({
  selector: 'app-textaria-basic',
  templateUrl: './textaria-basic.component.html',
  styleUrls: ['./textaria-basic.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TextariaBasicComponent),
    multi: true
  }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TextariaBasicComponent implements OnInit, ControlValueAccessor {
  @Input() public group?: FormGroup;
  @Input() public name: string;
  @Input() public label?: string;
  @Input() public placeholder?: string;
  @Input() public disabled?: boolean;
  @Input() public readonly?: boolean;
  @Input() public value?: string;
  @Input() public rows?: number;
  @Input() public cols?: number;
  @Input() boxWidth = '100%'; // Input box width
  @Input() marginBottom = '20px'; // Input margin on bottom

  constructor() { }

  ngOnInit() {
  }

  public onChange = (value: any) => { };
  public registerOnTouched = (fn: any) => { };
  public writeValue = (value: any) => this.onChange(value);
  public registerOnChange = (fn: (val: any) => void) => this.onChange = fn;
}
