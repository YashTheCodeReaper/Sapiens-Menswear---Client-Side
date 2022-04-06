import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  public eventSubject: Subject<any> = new Subject();
  constructor() {}
}
