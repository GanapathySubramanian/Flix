import { Component, HostListener, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TvshowDetails } from 'src/app/common/tvshow-details';
import myAppConfig from 'src/app/config/my-app-config';
import { TvshowsService } from 'src/app/services/tvshows.service';

var tvshow_id=0;
@Component({
  selector: 'app-tvshow-details',
  templateUrl: './tvshow-details.component.html',
  styleUrls: ['./tvshow-details.component.css']
})
export class TvshowDetailsComponent implements OnInit {

  imgUrl:string=myAppConfig.tmdb.imgUrl;

  tvshowDetails:TvshowDetails={} as TvshowDetails;

  backdropList:any;
  logoList:any;
  posterList:any
  reviewList:any;
  castList:any;
  crewList:any;
  similartvshowList:any;
  rectvshowList:any;
  videoList:any;
  
  background_image:any;
  watchprovider:any;


  noreview:boolean=false;
  nobackdrop:boolean=false;
  nopost:boolean=false;
  novideos:boolean=false;
  nocastdata:boolean=false;
  nocrewdata:boolean=false;
  norectvshowdata:boolean=false;
  nosimtvshowdata:boolean=false;
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
      
      this.videoList=videos.results;
      if(this.videoList.length==0){
        this.novideos=true;
      }else{
        this.novideos=false;
        for(let i=0;i<this.videoList.length;i++){
          if(this.videoList[i].key){
            this.videoList[i].key=this._sanitizer.bypassSecurityTrustResourceUrl(myAppConfig.tmdb.videoUrl+this.videoList[i].key);
          }
          else{
            this.videoList[i].key=null;
          }
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
          if(rectvshow.total_results==0){
            this.norectvshowdata=true;
          }else{
            this.norectvshowdata=false;
            this.rectvshowList=rectvshow.results;
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
        
        if(similartvshow.total_results==0){
          this.nosimtvshowdata=true;
        }else{
          this.nosimtvshowdata=false;
          this.similartvshowList=similartvshow.results;
        }
      })
  }

  getCredits(credits_url: string) {
    this.tvshowservice.gettvshowCredits(credits_url);

    let tempcreditData:any;
    this.tvshowservice.tvshowcreditData.subscribe((data)=>{
      tempcreditData=data;
      if(tempcreditData.cast.length==0){
        this.nocastdata=true;
      }else{
        this.nocastdata=false;
        this.castList=tempcreditData.cast;
      }
      if(tempcreditData.crew.length==0){
        this.nocrewdata=true;
      }else{
        this.nocrewdata=false;
      this.crewList=tempcreditData.crew;

      }
      
    })
  }

  getReviews(reviews_url: string) {
    this.tvshowservice.gettvshowReviews(reviews_url);

    let tempreviewData:any
    this.tvshowservice.tvshowreviewData.subscribe((data)=>{
      tempreviewData=data;

      if(tempreviewData.total_results==0){
        this.noreview=true;
      }else{
        this.noreview=false;
        this.reviewList=tempreviewData.results;
      }

    })
  }


  gettvshowImages(backdrop_url: string) {

      this.tvshowservice.getAllImages(backdrop_url);

      let tempimagesData:any;
      this.tvshowservice.tvshowallImageData.subscribe((data)=>{
        tempimagesData=data;

        if(tempimagesData.backdrops.length=='0'){
          this.nobackdrop=true;
          this.background_image=null;
        }
        else{
          this.nobackdrop=false;
          this.backdropList=tempimagesData.backdrops;

          this.background_image=myAppConfig.tmdb.highQualityImgUrl+tempimagesData.backdrops[0].file_path;
          
          
          setInterval(() =>{
            const random = Math.floor(Math.random() * tempimagesData.backdrops.length);
            this.background_image=myAppConfig.tmdb.highQualityImgUrl+tempimagesData.backdrops[random].file_path;
          },5000);

        }
        
        //Tvshow Posters Images
        if(tempimagesData.posters.length==0){
          this.nopost=true;
         
        }else{
          this.nopost=false;
          this.posterList=tempimagesData.posters;
        }
   

        //Tvshow Logo Images
        if(tempimagesData.logos.length<0){
          this.logoList.file_path=null;
        }else{
          this.logoList=tempimagesData.logos[0];
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

      
      // To Remove other than seasons
      for(let i=0;i<this.tvshowDetails.seasons.length;i++){
        if(this.tvshowDetails.seasons[i].season_number==0){
          this.tvshowDetails.seasons.splice(i, 1);
        }
      }
      
      if(this.tvshowDetails.homepage==""){
        var watch_provider=myAppConfig.tmdb.tvshowDetailsBaseUrl+tvshow_id+"/watch/providers?"+myAppConfig.tmdb.apikey;
        this.getWatchprovider(watch_provider)
      }else{
        this.watchprovider=this.tvshowDetails.homepage;
      }

    })
  }

  getWatchprovider(watch_provider: string) {
    this.tvshowservice.getWatchProviders(watch_provider);

    let watch:any;
    this.tvshowservice.watchData.subscribe((data)=>{
      watch=data;
      this.watchprovider=watch.results.IN.link;
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
