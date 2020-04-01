import { SpinnerService } from './spinner.service';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(
    private spinnerService: SpinnerService,
  ) { }

  /**
   * Generates error msg array from form control
   * @param fc form control
   * @param label input label
   */
  public getErrorMsg(fc: FormControl, label: string): string[] {
    const errors = [];
    if (fc.touched && fc.errors) {
      Object.keys(fc.errors).forEach(key => {
        const labelPretty = this.getTextPretty(label);
        switch (key) {
          case 'required':
            errors.push(`${labelPretty} required.`);
            break;
          case 'email':
            errors.push('Invalid email');
            break;
          case 'number':
            errors.push(`${labelPretty} should more then 0.`);
            break;
          default:
            break;
        }
      });
    }
    return errors;
  }

  /**
   * Returns pretty version of a text (eg. "LOREM IPSUM" => "Lorem Ipsum")
   * @param text text to prettyfy
   */
  public getTextPretty(text: string): string {
    const words = text.trim().split(' ');
    for (let i = 0; i < words.length; i++) {
      if (i === 0 && words[i].length === 1) {
        words[i] = words[i].toUpperCase();
      } else if (words[i].length === 1) {
        words[i] = words[i].toLowerCase();
      } else if (words[i].length > 1) {
        words[i] = `${words[i].charAt(0).toUpperCase()}${words[i].substr(1).toLowerCase()}`;
      }
    }
    return words.join(' ');
  }

  /**
   * Touches and updates value on all form controls of a form group
   * @param fg form group
   */
  public touchFG(fg: FormGroup) {
    Object.keys(fg.controls).forEach(key => {
      fg.get(key).markAsTouched();
      fg.get(key).updateValueAndValidity({ emitEvent: true });
    });
  }

  /**
   * Touches and updates value of form control
   * @param fc form control
   */
  public touchFC(fc: FormControl) {
    fc.markAsTouched();
    fc.updateValueAndValidity({ emitEvent: true });
  }


  /**
   * Touches and updates value of form array
   * @param fa form control
   */
  public touchFA(fa: FormArray) {
    fa.controls.forEach((key: FormGroup) => {
      this.touchFG(key);
    });
  }
}
