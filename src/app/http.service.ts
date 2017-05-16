import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class HttpService {

  constructor(private http: Http) {
  }

  public get(url) {
    return this.http.get(url, {
      headers: this.setHeaders()
    });
  }

  public post(url, object: Object) {
    return this.http.post(url, object, {
      headers: this.setHeaders()
    });
  }

  public setHeaders(): Headers {
    const encoded = sessionStorage.getItem('auth') || btoa('rickrongen:aapje');

    const headers: Headers = new Headers();
    headers.append('Authorization', `Basic ${encoded}`);

    return headers;
  }

}
