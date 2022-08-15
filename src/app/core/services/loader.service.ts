import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public loaderStatus = new BehaviorSubject(false);
  constructor() { }

  setLoader(status: boolean) {
    this.loaderStatus.next(status);
  }
}
