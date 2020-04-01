import { Injectable } from '@angular/core';

import 'rxjs';
import { Subject } from 'rxjs';

@Injectable()
export class EmitterService {

  private events = new Subject<any>();

  source$ = this.events.asObservable();

  // tslint:disable-next-line:typedef
  next(test: any) {
    this.events.next(test);
  }
}
