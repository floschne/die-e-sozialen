import { Injectable } from '@angular/core';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  loggedIn: boolean = false;

  constructor() {
  }

  login(user: string) {
    this.loggedIn = true;
  }

}
