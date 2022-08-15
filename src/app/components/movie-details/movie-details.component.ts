import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { MovieDetails } from 'src/app/core/interface/movie-details';
import myAppConfig from 'src/app/core/config/my-app-config';
import { MoviesService } from 'src/app/core/services/movies.service';
import { common } from 'src/app/core/interface/common';

var movie_id=0;
@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  imgUrl:string=myAppConfig.tmdb.imgUrl;
  highqualityImgUrl:string=myAppConfig.tmdb.highQualityImgUrl;
  
  movieDetails:MovieDetails={} as MovieDetails;


  windowScrolled: boolean=false;

  constructor(private route:ActivatedRoute,private router:Router,private movieservice:MoviesService,private _sanitizer:DomSanitizer) { 
    let id=this.route.snapshot?.params['id'];
    movie_id=id;
    
    this.movieDetails.crewList=[];
  }
  ngOnInit(): void {
    this.router?.navigateByUrl('/moviedetails/'+movie_id);

    this.getMovieDetails(movie_id);
    
  }


 


  getMovieDetails(id:number) {

    // To get the movie details
    let api_url=myAppConfig.tmdb.movieBaseUrl+'/movie/'+id+'?'+myAppConfig.tmdb.apikey;
    this.getMovieDetailsData(api_url);

    //To get the movie images
    let backdrop_url=myAppConfig.tmdb.movieBaseUrl+"/movie/"+movie_id+"/images?"+myAppConfig.tmdb.apikey;
    this.getMovieImages(backdrop_url)

    //To get the reviews
    let reviews_url=myAppConfig.tmdb.movieBaseUrl+'/movie/'+movie_id+'/reviews?'+myAppConfig.tmdb.apikey;
    this.getReviews(reviews_url);

    //To get the crew and cast details
    let credits_url=myAppConfig.tmdb.movieBaseUrl+'/movie/'+movie_id+'/credits?'+myAppConfig.tmdb.apikey;
    this.getCredits(credits_url);

    //To get the similar movies details
    let similar_url=myAppConfig.tmdb.movieBaseUrl+'/movie/'+movie_id+'/similar?'+myAppConfig.tmdb.apikey;
    this.getSimilarMovie(similar_url);

    //To get the Recommended movies details
    let recmovie_url=myAppConfig.tmdb.movieBaseUrl+'/movie/'+movie_id+'/recommendations?'+myAppConfig.tmdb.apikey;
    this.getRecMovies(recmovie_url);

    //To get the videos
    let video_url=myAppConfig.tmdb.movieBaseUrl+'/movie/'+movie_id+'/videos?'+myAppConfig.tmdb.apikey;
    this.getvideo(video_url);
  }

  getvideo(video_url: string) {
    this.movieservice.getVideos(video_url);

    let videos:any;
    this.movieservice.videoData.subscribe((data)=>{
      videos=data;
      
      this.movieDetails.videoList=videos.results;
     
        for(let i=0;i<this.movieDetails.videoList.length;i++){
          if(this.movieDetails.videoList[i].key){
            this.movieDetails.videoList[i].key=this._sanitizer.bypassSecurityTrustResourceUrl(myAppConfig.tmdb.videoUrl+this.movieDetails.videoList[i].key);
          }
          else{
            this.movieDetails.videoList[i].key=null;
          }
        
      }
      
    })
  }
  getWatchprovider(watch_provider: string) {
    this.movieservice.getWatchProviders(watch_provider);

    let watch:any;
    this.movieservice.watchData.subscribe((data)=>{
      watch=data;
      this.movieDetails.watchprovider=watch.results.IN[0]?.link;
    })
  }

  getRecMovies(recmovie_url: string) {
      this.movieservice.getRecommendedMovies(recmovie_url);

      let recmovie:any;
      this.movieservice.recmovieData.subscribe((data:any)=>{
          recmovie=data.results;

          for(let i=0;i<recmovie.length;i++){
            if(recmovie[i].poster_path==null){
              recmovie[i].poster_path=null;
            }
          }
          
            this.movieDetails.recmovieList=recmovie;              
          
      })
  }

  getSimilarMovie(similar_url: string) {
      this.movieservice.getSimilarMovies(similar_url);

      let similarmovie:any;
      this.movieservice.similarmovieData.subscribe((data)=>{
        similarmovie=data;

        for(let i=0;i<similarmovie.results.length;i++){
          if(similarmovie.results[i].poster_path==null){
            similarmovie.results[i].poster_path=null;
          }
        }
        
          this.movieDetails.similarmovieList=similarmovie.results;
        
      })
  }

  getCredits(credits_url: string) {
    this.movieservice.getMovieCredits(credits_url);
    
    let tempcreditData:any;
    this.movieservice.moviecreditData.subscribe((data)=>{
      tempcreditData=data;
      
        let castList=tempcreditData.cast;
        this.movieDetails.castList=castList;

        for(let i=0;i<castList.length;i++){

          this.movieDetails.castList[i].id=castList[i].id;
          this.movieDetails.castList[i].title=castList[i].name;
          this.movieDetails.castList[i].popularity=castList[i].popularity;
          this.movieDetails.castList[i].poster_path=castList[i].profile_path;
          this.movieDetails.castList[i].job=castList[i].known_for_department;
          this.movieDetails.castList[i].character=castList[i].character;
          
        }
      
      console.log(this.movieDetails.castList);
     

  
              let c_data=this.filterCrewData(tempcreditData.crew);

              this.movieDetails.crewList=c_data;
               
              for(let i=0;i<c_data.length;i++){

               this.movieDetails.crewList[i].id=c_data[i].id;
               this.movieDetails.crewList[i].title=c_data[i].name;
               this.movieDetails.crewList[i].popularity=c_data[i].popularity;
               this.movieDetails.crewList[i].poster_path=c_data[i].profile_path;
               this.movieDetails.crewList[i].job=c_data[i].known_for_department;
                
              }
          
    })
  }

  filterCrewData(arr:any):any{

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

  getReviews(reviews_url: string) {
    this.movieservice.getMovieReviews(reviews_url);
    
    let tempreviewData:any;
    this.movieservice.moviereviewData.subscribe((data)=>{
      tempreviewData=data;

      
        this.movieDetails.reviewList=tempreviewData.results;
      

      
      
    })
  }

  getMovieImages(backdrop_url: string) {
    this.movieservice.getAllImages(backdrop_url);

    let tempimagesData:any;
    this.movieservice.movieallImageData.subscribe((data)=>{
        tempimagesData=data;
        
        if(tempimagesData.backdrops.length=='0'){
          this.movieDetails.background_image=null;
        }
        else{
          this.movieDetails.backdropList=tempimagesData.backdrops;

          this.movieDetails.background_image=this.highqualityImgUrl+tempimagesData.backdrops[0].file_path;
          
          
          setInterval(() =>{
            const random = Math.floor(Math.random() * tempimagesData.backdrops.length);
            this.movieDetails.background_image=this.highqualityImgUrl+tempimagesData.backdrops[random].file_path;
          },5000);

        }
        
        //Movie Posters Images
       
          this.movieDetails.posterList=tempimagesData.posters;
        
   

        //Movie Logo Images
        if(tempimagesData.logos.length<0){
          this.movieDetails.logoList.file_path=null;
        }else{
          
          this.movieDetails.logoList=tempimagesData.logos[0];
        }
       
        
    })
  }



  getMovieDetailsData(url: string) {
    this.movieservice.getMovieDetails(url);

    let tempMovieDetails:any;
    this.movieservice.moviedetailsData.subscribe((data)=>{
    
      tempMovieDetails=data;

      //Default Movie Details 
      this.movieDetails.backdrop_path=tempMovieDetails.backdrop_path;
      this.movieDetails.backdrop_path=tempMovieDetails.backdrop_path;
      this.movieDetails.budget=tempMovieDetails.budget;
      this.movieDetails.homepage=tempMovieDetails.homepage;
      this.movieDetails.id=tempMovieDetails.id;
      this.movieDetails.imdb_id=tempMovieDetails.imdb_id;
      this.movieDetails.original_lan=tempMovieDetails.original_language;
      this.movieDetails.original_title=tempMovieDetails.original_title;
      this.movieDetails.overview=tempMovieDetails.overview;
      this.movieDetails.popularity=tempMovieDetails.popularity;
      this.movieDetails.poster_path=tempMovieDetails.poster_path;
      this.movieDetails.production_companies=tempMovieDetails.production_companies;
      this.movieDetails.production_countries=tempMovieDetails.production_countries;
      this.movieDetails.runtime=tempMovieDetails.runtime;
      this.movieDetails.genre=tempMovieDetails.genres;
      this.movieDetails.release_date=tempMovieDetails.release_date;
      this.movieDetails.revenue=tempMovieDetails.revenue;
      this.movieDetails.status=tempMovieDetails.status;
      this.movieDetails.vote_average=tempMovieDetails.vote_average;
    
      if(tempMovieDetails.homepage==""){
        var watch_provider=myAppConfig.tmdb.movieBaseUrl+'/movie/'+movie_id+"/watch/providers?"+myAppConfig.tmdb.apikey;
        this.getWatchprovider(watch_provider);
      }else{
        this.movieDetails.watchprovider=tempMovieDetails.homepage;
      }
    
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

