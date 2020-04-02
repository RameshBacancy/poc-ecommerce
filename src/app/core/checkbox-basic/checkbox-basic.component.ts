import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-checkbox-basic',
  templateUrl: './checkbox-basic.component.html',
  styleUrls: ['./checkbox-basic.component.scss'],
})
export class CheckboxBasicComponent implements OnInit {

  // Input label
  @Input() label: string = '';

  // Input box width
  @Input() boxWidth: string = '100%';

  // Input margin on bottom
  @Input() marginBottom: string = '20px';

  // Form Control
  @Input() fc: FormControl;

  public hover = false;

  constructor() { }

  ngOnInit() {
  }

  /**
   * Toggles checkbox
   */
  public toggle() {
    if (!this.fc.disabled) {
      if (this.fc.value) {
        this.fc.patchValue(false, { emitEvent: true });
      } else {
        this.fc.patchValue(true, { emitEvent: true });
      }
    }
  }

  /**
   * Mouse enter event (hover)
   */
  public mouseEnter() {
    if (!this.hover) {
      this.hover = true;
    }
  }

  /**
   * Mouse leave event (no hover)
   */
  public mouseLeave() {
    if (this.hover) {
      this.hover = false;
    }
  }

}
