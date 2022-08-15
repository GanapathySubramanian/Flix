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
  
       //Search Person Details
       private searchpersonSource = new Subject();
       searchpersonData = this.searchpersonSource.asObservable();
     
    //Social links
    private socialSource = new Subject();
    socialData = this.socialSource.asObservable();
  
    //Credits
    private creditSource = new Subject();
    creditData = this.creditSource.asObservable();
  
    //Pepole List
    private peopleSource = new Subject();
    peoplesData = this.peopleSource.asObservable();

  constructor(private http:HttpClient) {}
  getSearchPeoples(url:any){
    let searchpersons:any;
    this.http.get(url).subscribe((res)=>{
      searchpersons=res; 
      this.searchpersonSource.next(searchpersons);
    })
  }
  getPopularPeopleDetails(url:any){
    let peoples:any;
    this.http.get(url).subscribe((res)=>{
      peoples=res;
      this.peopleSource.next(peoples);
    })
  }
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
