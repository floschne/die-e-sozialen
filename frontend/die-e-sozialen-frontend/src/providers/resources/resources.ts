import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the ResourcesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ResourcesProvider {

  constructor(public httpClient: HttpClient) {
    console.log('ResourcesProvider is here!');
  }

  public getHelloWorld(): Observable<any> {
    return this.httpClient.get("/helloWorld");
  }

  public getMessages(): Observable<any> {
    return this.httpClient.get("/getMessages");
  }

  public getMapContent(type): Observable<any> {
    return this.httpClient.get("/getMapContent" + "?type=" + type);
  }

  public getAuthorities(): Observable<any> {
    return this.httpClient.get("/getAuthorities");
  }

  public postOffer(offer: any): Observable<any> {
    return this.httpClient.post("/offerHelp", offer);
  }

  public getHelp(): Observable<any> {
    return this.httpClient.get("/getHelp");
  }
}
