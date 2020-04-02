import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, forwardRef, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { OptionArray } from '../models/option-value.model';
import { SearchStringPipe } from '../pipe/search-string.pipe';

@Component({
  selector: 'app-select-basic',
  templateUrl: './select-basic.component.html',
  styleUrls: ['./select-basic.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectBasicComponent),
    multi: true
  }]
})
export class SelectBasicComponent implements OnInit, ControlValueAccessor {

  @Input() public group?: FormGroup;
  @Input() public name: string;
  @Input() public label?: string;
  @Input() public placeholder?: string;
  @Input() public disabled?: boolean;
  @Input() public readonly?: boolean;
  @Input() public options: Array<OptionArray>;
  @Input() public selectedValue?: any;
  @Input('icon')
  set icon(value: string) {
    this.iconSource = `/assets/icons/${value}.svg`;
  }
  @Input() marginBottom: string = '20px';

  public iconSource = '';
  private isFocused: boolean;
  private rowLocation: number = 0;
  private max: number;
  public select: string = '';
  public filterOptions: any[];
  constructor(private fb: FormBuilder, private searchString: SearchStringPipe) { }
  ngOnInit() {
    this.filterOptions = this.options;
    if(this.selectedValue != undefined){
      this.select = this.selectedValue;
    }

  }

  public onChange = (value: any) => { };
  public registerOnTouched = (fn: any) => { };
  public writeValue = (value: any) => this.onChange(value);
  public registerOnChange = (fn: (val: any) => void) => this.onChange = fn;

  // For showing option values
  showOptions() {
    this.isFocused = !this.isFocused;
  }

  // For getting selected value from dropdown
  public selectOption(item) {
    this.isFocused = false;
    this.select = item.name;
    this.onChange(item.value);
  }

  // For handling key events
  public _handleKeyUp(e: Event): void {
    if (e instanceof KeyboardEvent) {
      this.max = this.filterOptions.length;
      this.isFocused = true;
      switch (e.key) {
        case 'ArrowDown':
          this.rowLocation++;
          if (this.rowLocation > (this.max - 1) || !this.filterOptions[this.rowLocation]) {
            this.rowLocation = 0;
          }
          break;
        case 'ArrowUp':
          this.rowLocation--;
          if (!this.filterOptions[this.rowLocation]) {
            this.rowLocation = this.max - 1;
          }
          break;
        case 'Tab':
          this.isFocused = false;
          break;
        case 'Enter':
          this.selectOption(this.filterOptions[this.rowLocation]);
          break;
        case 'Backspace':
          // this.focused = true;
          break;
      }
    }
  }

  public handleClickOutside() {
    this.isFocused = false;
  }

  public filter(event) {
    this.select = event.target.value;
    this.filterOptions = this.options;
    if (this.select !== '') {
      this.filterOptions = this.searchString.transform(this.options, 'name', this.select);
    }
  }
}
