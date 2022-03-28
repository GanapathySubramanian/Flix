import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { PersonDetails } from 'src/app/common/person-details';
import myAppConfig from 'src/app/config/my-app-config';
import { PeopleService } from 'src/app/services/people.service';
import { TvshowDetailsComponent } from '../tvshow-details/tvshow-details.component';

var person_id='';
@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.css']
})
export class PersonDetailsComponent implements OnInit {

  imgUrl:any=myAppConfig.tmdb.imgUrl;

  personDetails:PersonDetails={} as PersonDetails;

  castTvList:any=[];
  castMovieList:any=[];
  crewTvList:any=[];
  crewMovieList:any=[];

  nocastMovie:boolean=true;
  nocastTv:boolean=true;
  nocrewMovie:boolean=true;
  nocrewTv:boolean=true;
  windowScrolled: boolean=false;
  
  constructor(private route: ActivatedRoute,private peopleservice:PeopleService) { 
    let id = this.route.snapshot.params['id'];
    person_id=id;
  }

  ngOnInit(): void {
    this.getPersonDetails();
  }

  getPersonDetails() {
    let api_url=myAppConfig.tmdb.personBaseUrl+person_id+'?'+myAppConfig.tmdb.apikey;
    this.getPersonDetailsData(api_url);

    var movie_tvshows_credit=myAppConfig.tmdb.personBaseUrl+person_id+'/combined_credits?'+myAppConfig.tmdb.apikey;
    this.getCredits(movie_tvshows_credit)

    var external_ids=myAppConfig.tmdb.personBaseUrl+person_id+'/external_ids?'+myAppConfig.tmdb.apikey;
    this.getExternalid(external_ids)
  }
  
  getExternalid(external_ids: string) {
    this.peopleservice.getSocialLinks(external_ids);

    let tempsociallinks:any;
    this.peopleservice.socialData.subscribe((data)=>{
      tempsociallinks=data;
      
      
      this.personDetails.facebook_id=tempsociallinks.facebook_id;
      this.personDetails.freebase_id=tempsociallinks.freebase_id;
      this.personDetails.instagram_id=tempsociallinks.instagram_id;
      this.personDetails.freebase_mid=tempsociallinks.freebase_mid;
      this.personDetails.tvrage_id=tempsociallinks.tvrage_id;
      this.personDetails.twitter_id=tempsociallinks.twitter_id; 
      this.personDetails.imdb_id=tempsociallinks.imdb_id;
    })
  }

  getCredits(movie_tvshows_credit: string) {
    this.peopleservice.getCredits(movie_tvshows_credit);

    let tempcredit:any;
    this.peopleservice.creditData.subscribe((data)=>{
      tempcredit=data;
      
      // this.castMovieList=tempcredit.cast;
      // this.crewTvList=tempcredit.crew;

      let castMoviecount=0,castTvcount=0;
      let j=0,k=0;
      for(let i=0;i<tempcredit.cast.length;i++){
        if(tempcredit.cast[i].media_type=='movie'){
          this.castMovieList[j]=tempcredit.cast[i];
          j++;
          castMoviecount++;
        }else if(tempcredit.cast[i].media_type=='tv'){
          this.castTvList[k]=tempcredit.cast[i];
          k++;
          castTvcount++;
        }
      }
      
      if(castMoviecount==0){
        this.nocastMovie=true;
      }else{
        this.nocastMovie=false;
      }

      if(castTvcount==0){
        this.nocastTv=true;
      }else{
        this.nocastTv=false;
      }

      let crewMoviecount=0,crewTvcount=0;
      let m=0,n=0;
      for(let i=0;i<tempcredit.crew.length;i++){
        if(tempcredit.crew[i].media_type=='movie'){
          this.crewMovieList[m]=tempcredit.crew[i];
          m++;
          crewMoviecount++;
        }else if(tempcredit.crew[i].media_type=='tv'){
          this.crewTvList[n]=tempcredit.crew[i];
          n++;
          crewTvcount++;
        }
      }
      
      if(crewMoviecount==0){
        this.nocrewMovie=true;
      }else{
        this.nocrewMovie=false;
      }

      if(crewTvcount==0){
        this.nocrewTv=true;
      }else{
        this.nocrewTv=false;
      }
      
    })
  }

  getPersonDetailsData(api_url: string) {
    this.peopleservice.getPersonDetails(api_url);

    let temppersondetails:any;
    this.peopleservice.personData.subscribe((data)=>{
      temppersondetails=data;
      

      this.personDetails.biography=temppersondetails.biography;
      this.personDetails.birthday=temppersondetails.birthday;
        
      if(temppersondetails.deathday==null){
        this.personDetails.deathday='Nil';
      
        
      }else{
        this.personDetails.deathday=temppersondetails.deathday;
      }

      if(temppersondetails.gender==2){
        this.personDetails.gender='Male'
      }else if(temppersondetails.gender==1){
        this.personDetails.gender='Female'
      }else{
        this.personDetails.gender='Others'
      }

      this.personDetails.homepage=temppersondetails.homepage;
      this.personDetails.id=temppersondetails.id;
      this.personDetails.imdb_id=temppersondetails.imdb_id;
      this.personDetails.known_for_department=temppersondetails.known_for_department;
      this.personDetails.name=temppersondetails.name;
      this.personDetails.place_of_birth=temppersondetails.place_of_birth;
      this.personDetails.popularity=temppersondetails.popularity;
      this.personDetails.profile_path=temppersondetails.profile_path;

    })

  }

  float2int (value:any) {
    return value | 0;
  }

  @HostListener('window:scroll',[])
  onWindowScroll() {
      if (window.scrollY> 1000) {        
          this.windowScrolled = true;
      } 
     else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
          this.windowScrolled = false;
      }
  }

    scrollToTop(){
      window.scroll({ 
            top: 0, 
            left: 0, 
            behavior: 'smooth' 
      });
  }
}
