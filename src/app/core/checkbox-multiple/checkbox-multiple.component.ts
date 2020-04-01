import { ChangeDetectionStrategy, Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-checkbox-multiple',
  templateUrl: './checkbox-multiple.component.html',
  styleUrls: ['./checkbox-multiple.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CheckboxMultipleComponent),
    multi: true
  }]
})
export class CheckboxMultipleComponent implements OnInit, ControlValueAccessor {

  @Input() public options: any[];
  @Input() disabled: boolean;
  @Input() id: boolean;
  @Input() requiredCheckbox: boolean;
  @Input() isReverse: boolean;
  @Output() toggle = new EventEmitter<any[]>();
  isTouch: boolean;

  constructor() { }

  ngOnInit() {
  }

  onToggle() {
    this.isTouch = true;
    const selectedOption = this.options.filter( (option) => option.checked );
    this.toggle.emit(selectedOption);
    this.onChange(selectedOption);
   }

  public onChange = (value: any) => { };
  public registerOnTouched = (fn: any) => { };
  public writeValue = (value: any) => { this.onChange(value); };
  public registerOnChange = (fn: (val: any) => void) => this.onChange = fn;
  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}
