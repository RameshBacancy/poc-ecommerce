import { Component, OnInit, Input, EventEmitter, Output, forwardRef } from '@angular/core';
import { Options, ChangeContext } from 'ng5-slider';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
@Component({
  selector: 'app-range-slider-basic',
  templateUrl: './range-slider-basic.component.html',
  styleUrls: ['./range-slider-basic.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RangeSliderBasicComponent),
    multi: true
  }],
})
export class RangeSliderBasicComponent implements OnInit, ControlValueAccessor {
  @Input() public value: number = 0;
  @Input() public options: Options;
  @Input() public minValue?: number;
  @Input() public maxValue: number = 0;
  @Input() public label?: string;
  @Input() public text?: string;
  @Input() public suffix?: string;
  @Input() public prefix?: string;
  @Input() public name: string;
  @Output() rangeSelect = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }
  public onChange = (value: any) => { };
  public registerOnTouched = (fn: any) => { };
  public writeValue = (value: any) => this.onChange(value);
  public registerOnChange = (fn: (val: any) => void) => this.onChange = fn;

  public onUserChangeEnd(changeContext: ChangeContext): void {
    const range = {
      minValue: changeContext.value,
      maxValue: changeContext.highValue
    };
    this.rangeSelect.emit({ ...{}, ...range });
    this.onChange(range);
  }

}
