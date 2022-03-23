import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { MovieDetails } from 'src/app/common/movie-details';
import myAppConfig from 'src/app/config/my-app-config';
import { MoviesService } from 'src/app/services/movies.service';


var movie_id=0;
@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  imgUrl:string=myAppConfig.tmdb.imgUrl;
  
  movieDetails:MovieDetails={} as MovieDetails;
  
  backdropList:any;
  logoList:any;
  posterList:any
  reviewList:any;
  castList:any;
  crewList:any;
  similarmovieList:any;
  recmovieList:any;
  videoList:any;
  
  background_image:any;
  watchprovider:any;


  noreview:boolean=false;
  nobackdrop:boolean=false;
  nopost:boolean=false;
  novideos:boolean=false;
  nocastdata:boolean=false;
  nocrewdata:boolean=false;
  norecmoviedata:boolean=false;
  nosimmoviedata:boolean=false;

  constructor(private route:ActivatedRoute,private router:Router,private movieservice:MoviesService,private _sanitizer:DomSanitizer) { 
    let id=this.route.snapshot.params['id'];
    movie_id=id;
  }

  ngOnInit(): void {
    this.router.navigateByUrl('/moviedetails/'+movie_id);

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
  getWatchprovider(watch_provider: string) {
    this.movieservice.getWatchProviders(watch_provider);

    let watch:any;
    this.movieservice.watchData.subscribe((data)=>{
      watch=data;
      this.watchprovider=watch.results.IN.link;
    })
  }

  getRecMovies(recmovie_url: string) {
      this.movieservice.getRecommendedMovies(recmovie_url);

      let recmovie:any;
      this.movieservice.recmovieData.subscribe((data)=>{
          recmovie=data;
          console.log(recmovie);
          
          if(recmovie.total_results==0){
            this.norecmoviedata=false;
          }else{
            this.norecmoviedata=false;
            this.recmovieList=recmovie.results;
          }
      })
  }

  getSimilarMovie(similar_url: string) {
      this.movieservice.getSimilarMovies(similar_url);

      let similarmovie:any;
      this.movieservice.similarmovieData.subscribe((data)=>{
        similarmovie=data;
        if(similarmovie.total_results==0){
          this.nosimmoviedata=true;
        }else{
          this.nosimmoviedata=false;
          this.similarmovieList=similarmovie.results;
        }
      })
  }

  getCredits(credits_url: string) {
    this.movieservice.getMovieCredits(credits_url);
    
    let tempcreditData:any;
    this.movieservice.moviecreditData.subscribe((data)=>{
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
    this.movieservice.getMovieReviews(reviews_url);
    
    let tempreviewData:any;
    this.movieservice.moviereviewData.subscribe((data)=>{
      tempreviewData=data;

      if(tempreviewData.total_results==0){
        this.noreview=true;
      }else{
        this.noreview=false;
        this.reviewList=tempreviewData.results;
      }

      
      
    })
  }

  getMovieImages(backdrop_url: string) {
    this.movieservice.getAllImages(backdrop_url);

    let tempimagesData:any;
    this.movieservice.movieallImageData.subscribe((data)=>{
        tempimagesData=data;
        
        if(tempimagesData.backdrops.length=='0'){
          this.nobackdrop=true;
          this.background_image=null;
        }
        else{
          this.nobackdrop=false;
          this.backdropList=tempimagesData.backdrops;

          this.background_image='https://image.tmdb.org/t/p/original/'+tempimagesData.backdrops[0].file_path;
          setInterval(() =>{
            const random = Math.floor(Math.random() * tempimagesData.backdrops.length);
            this.background_image='https://image.tmdb.org/t/p/original/'+tempimagesData.backdrops[random].file_path;
          },5000);

        }
        
        //Movie Posters Images
        if(tempimagesData.posters.length==0){
          this.nopost=true;
         
        }else{
          this.nopost=false;
          this.posterList=tempimagesData.posters;
        }
   

        //Movie Logo Images
        if(tempimagesData.logos.length<0){
          this.logoList.file_path=null;
        }else{
          this.logoList=tempimagesData.logos[0];
        }
       
        
    })
  }



  getMovieDetailsData(url: string) {
    this.movieservice.getMovieDetails(url);

    let tempMovieDetails:any;
    this.movieservice.moviedetailsData.subscribe((data)=>{
      console.log(data);
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
        this.getWatchprovider(watch_provider)
      }else{
        this.watchprovider=tempMovieDetails.homepage;
      }
    
    })
  }


  float2int (value:any) {
    return value | 0;
  }


}
