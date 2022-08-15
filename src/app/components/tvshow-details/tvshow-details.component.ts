import { Component, HostListener, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TvshowDetails } from 'src/app/core/interface/tvshow-details';
import myAppConfig from 'src/app/core/config/my-app-config';
import { TvshowsService } from 'src/app/core/services/tvshows.service';
import { common } from 'src/app/core/interface/common';

var tvshow_id=0;
@Component({
  selector: 'app-tvshow-details',
  templateUrl: './tvshow-details.component.html',
  styleUrls: ['./tvshow-details.component.css']
})
export class TvshowDetailsComponent implements OnInit {

  imgUrl:string=myAppConfig.tmdb.imgUrl;
  highqualityImgUrl:string=myAppConfig.tmdb.highQualityImgUrl;

  tvshowDetails:TvshowDetails={} as TvshowDetails;

  windowScrolled: boolean=false;

  constructor(private route:ActivatedRoute,private router:Router,private tvshowservice:TvshowsService,private _sanitizer:DomSanitizer) { 
      let id=this.route.snapshot.params['id'];
      tvshow_id=id;
     
  }


  ngOnInit(): void {
    this.router.navigateByUrl('/tvshowdetails/'+tvshow_id);

    this.getTvshowDetails(tvshow_id);
  }

  getTvshowDetails(tvshow_id: number) {

    // To get the Tvshow details
    let api_url=myAppConfig.tmdb.tvshowDetailsBaseUrl+tvshow_id+'?'+myAppConfig.tmdb.apikey;
    this.gettvshowDetailsData(api_url);

    //To get the Tvshow images
    let backdrop_url=myAppConfig.tmdb.tvshowDetailsBaseUrl+tvshow_id+"/images?"+myAppConfig.tmdb.apikey;
    this.gettvshowImages(backdrop_url)

     //To get the reviews
     let reviews_url=myAppConfig.tmdb.tvshowDetailsBaseUrl+tvshow_id+"/reviews?"+myAppConfig.tmdb.apikey;
     this.getReviews(reviews_url);

      //To get the crew and cast details
      let credits_url=myAppConfig.tmdb.tvshowDetailsBaseUrl+tvshow_id+"/credits?"+myAppConfig.tmdb.apikey;
      this.getCredits(credits_url);

    //To get the similar tvshows details
    let similar_url=myAppConfig.tmdb.tvshowDetailsBaseUrl+tvshow_id+"/similar?"+myAppConfig.tmdb.apikey;
    this.getSimilartvshow(similar_url);

    //To get the Recommended tvshows details
    let rectvshow_url=myAppConfig.tmdb.tvshowDetailsBaseUrl+tvshow_id+"/recommendations?"+myAppConfig.tmdb.apikey;
    this.getRectvshows(rectvshow_url);

    //To get the videos
    let video_url=myAppConfig.tmdb.tvshowDetailsBaseUrl+tvshow_id+"/videos?"+myAppConfig.tmdb.apikey;
    this.getvideo(video_url);
  }

  getvideo(video_url: string) {
    this.tvshowservice.getVideos(video_url);

    let videos:any;
    this.tvshowservice.videoData.subscribe((data)=>{
      videos=data;
      
      this.tvshowDetails.videoList=videos.results;
      
        for(let i=0;i<this.tvshowDetails.videoList.length;i++){
          if(this.tvshowDetails.videoList[i].key){
            this.tvshowDetails.videoList[i].key=this._sanitizer.bypassSecurityTrustResourceUrl(myAppConfig.tmdb.videoUrl+this.tvshowDetails.videoList[i].key);
          }
          else{
            this.tvshowDetails.videoList[i].key=null;
          }
        }
      
      
    })
  }

  getRectvshows(rectvshow_url: string) {
    this.tvshowservice.getRecommendedtvshows(rectvshow_url);

      let rectvshow:any;
      this.tvshowservice.rectvshowData.subscribe((data)=>{
        rectvshow=data;


        for(let i=0;i<rectvshow.results.length;i++){
          if(rectvshow.results[i].poster_path==null){
            rectvshow.results[i].poster_path="Empty";
          }
        }
            this.tvshowDetails.rectvshowList=rectvshow.results;
            console.log(this.tvshowDetails.rectvshowList);
            
      let rec_tvshow=rectvshow.results;
      this.tvshowDetails.similartvshowList=rec_tvshow;
      for(let i=0;i<rec_tvshow.length;i++){

        this.tvshowDetails.rectvshowList[i].id=rec_tvshow[i].id;
        this.tvshowDetails.rectvshowList[i].title=rec_tvshow[i].name;
        this.tvshowDetails.rectvshowList[i].poster_path=rec_tvshow[i].poster_path;
        this.tvshowDetails.rectvshowList[i].vote_average=rec_tvshow[i].vote_average;
        this.tvshowDetails.rectvshowList[i].release_date=rec_tvshow[i].first_air_date;

        
        
      }
          
      })
  }
  getSimilartvshow(similar_url: string) {
    this.tvshowservice.getSimilartvshows(similar_url);

    let similartvshow:any;
      this.tvshowservice.similartvshowData.subscribe((data)=>{
        similartvshow=data;
        for(let i=0;i<similartvshow.results.length;i++){
          if(similartvshow.results[i].poster_path==null){
            similartvshow.results[i].poster_path="Empty";
          }
        }
        

        let s_tvshow=similartvshow.results;
        this.tvshowDetails.similartvshowList=s_tvshow;
        for(let i=0;i<s_tvshow.length;i++){

          this.tvshowDetails.similartvshowList[i].id=s_tvshow[i].id;
          this.tvshowDetails.similartvshowList[i].title=s_tvshow[i].name;
          this.tvshowDetails.similartvshowList[i].poster_path=s_tvshow[i].poster_path;
          this.tvshowDetails.similartvshowList[i].vote_average=s_tvshow[i].vote_average;
          this.tvshowDetails.similartvshowList[i].release_date=s_tvshow[i].first_air_date;

          
          
        }
          
        
      })
  }

  getCredits(credits_url: string) {
    this.tvshowservice.gettvshowCredits(credits_url);

    let tempcreditData:any;
    this.tvshowservice.tvshowcreditData.subscribe((data)=>{
      tempcreditData=data;
      
          
        let castList=tempcreditData.cast;
        this.tvshowDetails.castList=castList;

        for(let i=0;i<castList.length;i++){

          this.tvshowDetails.castList[i].id=castList[i].id;
          this.tvshowDetails.castList[i].title=castList[i].name;
          this.tvshowDetails.castList[i].popularity=castList[i].popularity;
          this.tvshowDetails.castList[i].poster_path=castList[i].profile_path;
          this.tvshowDetails.castList[i].job=castList[i].known_for_department;
          this.tvshowDetails.castList[i].character=castList[i].character;
          
          
        }
        console.log(this.tvshowDetails.castList);
        

        let c_data=this.filterCrewData(tempcreditData.crew);
        this.tvshowDetails.crewList=c_data;
               
        for(let i=0;i<c_data.length;i++){

         this.tvshowDetails.crewList[i].id=c_data[i].id;
         this.tvshowDetails.crewList[i].title=c_data[i].name;
         this.tvshowDetails.crewList[i].popularity=c_data[i].popularity;
         this.tvshowDetails.crewList[i].poster_path=c_data[i].profile_path;
         this.tvshowDetails.crewList[i].job=c_data[i].known_for_department;
          
        }
      
    })
  }

  getReviews(reviews_url: string) {
    this.tvshowservice.gettvshowReviews(reviews_url);

    let tempreviewData:any
    this.tvshowservice.tvshowreviewData.subscribe((data)=>{
      tempreviewData=data;

      
        this.tvshowDetails.reviewList=tempreviewData.results;
      

    })
  }


  gettvshowImages(backdrop_url: string) {

      this.tvshowservice.getAllImages(backdrop_url);

      let tempimagesData:any;
      this.tvshowservice.tvshowallImageData.subscribe((data)=>{
        tempimagesData=data;

        if(tempimagesData.backdrops.length=='0'){
      
          this.tvshowDetails.background_image=null;
        }
        else{
       
          this.tvshowDetails.backdropList=tempimagesData.backdrops;

          this.tvshowDetails.background_image=this.highqualityImgUrl+tempimagesData.backdrops[0].file_path;
          
          
          setInterval(() =>{
            const random = Math.floor(Math.random() * tempimagesData.backdrops.length);
            this.tvshowDetails.background_image=this.highqualityImgUrl+tempimagesData.backdrops[random].file_path;
          },5000);

        }
        
        //Tvshow Posters Images
        
          this.tvshowDetails.posterList=tempimagesData.posters;
        
   

        //Tvshow Logo Images
        if(tempimagesData.logos.length<0){
          this.tvshowDetails.logoList.file_path=null;
        }else{
          this.tvshowDetails.logoList=tempimagesData.logos[0];
        }
       
        
        
      })
  }




  gettvshowDetailsData(url: any) {
    this.tvshowservice.gettvshowDetails(url);

    let tempTvshowDetails:any;
    this.tvshowservice.tvshowdetailsData.subscribe((data)=>{
     
      tempTvshowDetails=data;


      //Default Tvshow Details  
      this.tvshowDetails.backdrop_path=tempTvshowDetails.backdrop_path;
      this.tvshowDetails.episode_run_time=tempTvshowDetails.episode_run_time;
      this.tvshowDetails.avg_run_time=this.tvshowDetails.episode_run_time[0];
      for(let i=0;i<this.tvshowDetails.episode_run_time.length;i++){
        if(this.tvshowDetails.avg_run_time<this.tvshowDetails.episode_run_time[i]){
            this.tvshowDetails.avg_run_time=this.tvshowDetails.episode_run_time[i];
        }
      }
      this.tvshowDetails.first_air_date=tempTvshowDetails.first_air_date;
      this.tvshowDetails.genre=tempTvshowDetails.genres;
      this.tvshowDetails.homepage=tempTvshowDetails.homepage;
      this.tvshowDetails.id=tempTvshowDetails.id;
      this.tvshowDetails.original_lan=tempTvshowDetails.original_language;     
      this.tvshowDetails.last_air_date=tempTvshowDetails.last_air_date;
      this.tvshowDetails.last_episode_to_air=tempTvshowDetails.last_episode_to_air;
      this.tvshowDetails.networks=tempTvshowDetails.networks;
      this.tvshowDetails.no_of_episodes=tempTvshowDetails.number_of_episodes;
      this.tvshowDetails.no_of_seasons=tempTvshowDetails.number_of_seasons;
      this.tvshowDetails.original_title=tempTvshowDetails.original_name;
      this.tvshowDetails.overview=tempTvshowDetails.overview;
      this.tvshowDetails.popularity=tempTvshowDetails.popularity;
      this.tvshowDetails.poster_path=tempTvshowDetails.poster_path;
      this.tvshowDetails.production_companies=tempTvshowDetails.production_companies;
      this.tvshowDetails.production_countries=tempTvshowDetails.production_countries;
      this.tvshowDetails.seasons=tempTvshowDetails.seasons;
      this.tvshowDetails.status=tempTvshowDetails.status;
      this.tvshowDetails.tagline=tempTvshowDetails.tagline;
      this.tvshowDetails.vote_average=tempTvshowDetails.vote_average;
      this.tvshowDetails.vote_count=tempTvshowDetails.vote_count;
      
      console.log(this.tvshowDetails);
      
      
      // To Remove other than seasons
      // for(let i=0;i<this.tvshowDetails.seasons.length;i++){
      //   if(this.tvshowDetails.seasons[i].season_number==0){
      //     this.tvshowDetails.seasons.splice(i, 1);
      //   }
      // }
      
      if(this.tvshowDetails.homepage==""){
        var watch_provider=myAppConfig.tmdb.tvshowDetailsBaseUrl+tvshow_id+"/watch/providers?"+myAppConfig.tmdb.apikey;
        this.getWatchprovider(watch_provider)
      }else{
        this.tvshowDetails.watchprovider=this.tvshowDetails.homepage;
      }

    })
  }

  getWatchprovider(watch_provider: string) {
    this.tvshowservice.getWatchProviders(watch_provider);

    let watch:any;
    this.tvshowservice.watchData.subscribe((data)=>{
      watch=data;
      this.tvshowDetails.watchprovider=watch.results.IN.link;
    })
  }


  
  float2int (value:any) {
    return value | 0;
  }

   filterCrewData(arr:any):any{
    console.log(arr);
    
    let clientImages:any=[];
    var c_data:any  =[];
    c_data= arr;
          for(var i=0;i<c_data.length;i++){
                if(clientImages[c_data[i].id]){
                
                  if(clientImages[c_data[i].id].includes(c_data[i].job)){
                    continue;
                  }else{
                    clientImages[c_data[i].id]= clientImages[c_data[i].id] +', '+c_data[i].job
                  }
                }else{
              clientImages[c_data[i].id] =c_data[i].job
          }
        }

          //remove duplicate entries
          c_data = c_data.filter((obj:any, pos:any, arr:any) => {
            return arr
              .map((mapObj:any)=> mapObj.id)
              .indexOf(obj.id) == pos;
          });
        
          clientImages.forEach((res:any)=> {
            for(let i=0;i<c_data.length;i++){
              if(clientImages[c_data[i].id]){
                c_data[i].job=clientImages[c_data[i].id];
              }
            }
          });

      return c_data;
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
