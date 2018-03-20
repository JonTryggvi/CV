import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class ApiService {

  url = 'https://jontryggvi.is/wp-json/wp/v2/pages/158/';
  // data: any = null;

  constructor(private http: Http) {
  }

  public getData(): Observable<any> {
    return this.http.get(this.url)
      .map((res: Response) => res.json());
  }

}
