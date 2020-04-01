import { Component, OnInit, Input, OnDestroy, forwardRef } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as uuid from 'uuid';
import { CoreService } from 'src/app/services/core.service';

@Component({
  selector: 'app-input-basic',
  templateUrl: './input-basic.component.html',
  styleUrls: ['./input-basic.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputBasicComponent),
    multi: true
  }]
})
export class InputBasicComponent implements OnInit, OnDestroy, ControlValueAccessor {

  // Input label
  @Input() label: string = '';

  // Input type
  @Input() type: string = 'text';

  // Input placeholder
  @Input() placeholder: string = '';

  // Input hideLabel
  @Input() hideLabel: boolean = true;

  // Input icon
  @Input('icon') 
  set icon(value: string) {
    this.iconSource = value;
  }

  // Input box width
  @Input() boxWidth = '100%';

  // Input margin on bottom
  @Input() marginBottom = '20px';

  // Form Control
  @Input() fc: FormControl;

  public inputId = uuid.v4();
  public iconSource = '';
  public isFocused = false;
  public errorMsg = [];

  private _subscriptions = [];

  constructor(
    private coreService: CoreService,
  ) { }

  ngOnInit() {
    // Subscribe to form control value changes
    this._subscriptions.push(this.fc.valueChanges.subscribe(
      () => this.errorMsg = this.coreService.getErrorMsg(this.fc, this.label),
    ));
  }

  /**
   * Focus input unless disabled
   * @param e event
   */
  public focusInput(e) {
    if (!this.fc.disabled) {
      document.getElementById(this.inputId).focus();
    }
  }

  /**
   * Handler for input focus in
   * @param e event
   */
  public onFocusIn(e) {
    if (!this.fc.disabled) {
      this.isFocused = true;
    } else {
      e.preventDefault();
    }
  }

  /**
   * Handler for input focus out
   */
  public onFocusOut() {
    this.isFocused = false;
    this.fc.updateValueAndValidity({ emitEvent: true });
  }

  ngOnDestroy() {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public onChange = (value: any) => { };
  public registerOnTouched = (fn: any) => { };
  public writeValue = (value: any) => this.onChange(value);
  public registerOnChange = (fn: (val: any) => void) => this.onChange = fn;

}
