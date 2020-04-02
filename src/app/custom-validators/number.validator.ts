import { AbstractControl } from '@angular/forms';

export function NumberValidator(control: AbstractControl): { [key: string]: boolean } | null {
  if (control.value < 1) {
    return { 'number': true };
  }
  return null;
}