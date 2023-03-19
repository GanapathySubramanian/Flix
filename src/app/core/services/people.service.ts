import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  constructor(private http: HttpClient) {}
  getSearchPeoples(url: any): Observable<any> {
    return this.http.get(url);
  }
  getPopularPeopleDetails(url: any): Observable<any> {
    return this.http.get(url);
  }
  getPersonDetails(url: any): Observable<any> {
    return this.http.get(url);
  }

  getSocialLinks(url: any): Observable<any> {
    return this.http.get(url);
  }

  getCredits(url: any): Observable<any> {
    return this.http.get(url);
  }
}
