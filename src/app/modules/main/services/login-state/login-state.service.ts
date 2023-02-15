import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginStateService {
  private _state: boolean;
  changeState: EventEmitter<boolean>;

  constructor() {
    const state = localStorage.getItem('login');
    if (state !== null && state === 'true') {
      this._state = true;
    } else if (state !== null && state === 'false') {
      this._state = false;
    } else {
      this._state = false;
    }
    this.changeState = new EventEmitter<boolean>();
  }
  set state(value: boolean) {
    this._state = value;
    localStorage.setItem('login', String(value));
    this.changeState.emit(value);
  }

  get state() {
    return this._state;
  }
}
