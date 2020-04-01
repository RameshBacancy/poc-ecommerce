import { Component, OnInit, Input, EventEmitter, Output, forwardRef } from '@angular/core';
import { Options, ChangeContext } from 'ng5-slider';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-slider-basic',
  templateUrl: './slider-basic.component.html',
  styleUrls: ['./slider-basic.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SliderBasicComponent),
    multi: true
  }]
})
export class SliderBasicComponent implements OnInit, ControlValueAccessor {
  @Input() public value = 0;
  @Input() public options: Options;
  @Input() public minValue?: number;
  @Input() public maxValue = 0;
  @Input() public label?: string;
  @Input() public suffix?: string;
  @Input() public prefix?: string;
  @Input() public name: string;
  @Output() sliderSelect = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }

  public onChange = (value: any) => { };
  public registerOnTouched = (fn: any) => { };
  public writeValue = (value: any) => this.onChange(value);
  public registerOnChange = (fn: (val: any) => void) => this.onChange = fn;

  public onUserChangeEnd(changeContext: ChangeContext): void {
    const singleValue = changeContext.value;
    this.sliderSelect.emit(singleValue);
    this.onChange(singleValue);
  }
}
