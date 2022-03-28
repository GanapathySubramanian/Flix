import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

    //Person Details
    private personSource = new Subject();
    personData = this.personSource.asObservable();
  
    //Social links
    private socialSource = new Subject();
    socialData = this.socialSource.asObservable();
  
    //Credits
    private creditSource = new Subject();
    creditData = this.creditSource.asObservable();
  
  constructor(private http:HttpClient) {}
   
  getPersonDetails(url:any){
    let personDetails:any;
    this.http.get(url).subscribe((res)=>{
      personDetails=res;
      this.personSource.next(personDetails);
    })
  }

  getSocialLinks(url:any){
    let links:any;
    this.http.get(url).subscribe((res)=>{
      links=res;
      this.socialSource.next(links);
    })
  }

  getCredits(url:any){
    let credits:any;
    this.http.get(url).subscribe((res)=>{
      credits=res;
      this.creditSource.next(credits);
    })
  }
}
