import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import myAppConfig from 'src/app/config/my-app-config';
import { FormControl, FormGroup } from '@angular/forms';


var sort_by_desc="popularity.desc",page=1,Search_value="",genre_id="";
var sorts_by='Trending Now';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  imgUrl:string=myAppConfig.tmdb.imgUrl;

  movieList:any;
  genreList:any;
  orderList:any;

  page_no:number=page;
  genre_value:string="";
  sortby_value:string=sorts_by;
  searchForm!:FormGroup;
  isdisableprev:boolean=false;
  isdisablenext:boolean=false;
  ishidedrop:boolean=false;
  constructor(private movieservice:MoviesService) { 
    this.searchForm=new FormGroup({
      'movieName':new FormControl("")
    })
    if(Search_value==""){
      this.ishidedrop=false;
      
    }else{
      this.ishidedrop=true;
    }
  }

  ngOnInit(): void {
    this.getGenre()
    this.getOrder()
    this.getMovies()
  }

  getOrder() {
    this.movieservice.getOrderList().subscribe((data)=>{
      this.orderList=data; 
    })
  }
  getGenre() {
    this.movieservice.getGenreList().subscribe((data)=>{
      this.genreList=data;
    })
  }

  getMovies(){
      page=1;
      this.page_no=1;
      this.genre_value="";
      genre_id="";
      if(Search_value==" "|| Search_value==""){
        sort_by_desc="popularity.desc";
        this.sortby_value='Trending Now';
        let apiurl=myAppConfig.tmdb.movieBaseUrl+'/discover/movie?sort_by='+sort_by_desc+'&'+myAppConfig.tmdb.apikey+'&page='+page;
        this.getMoviesData(apiurl);
      }else{
        this.sortby_value=Search_value;
        this.getMoviesData(myAppConfig.tmdb.movieBaseUrl+'/search/movie?'+myAppConfig.tmdb.apikey+'&query='+Search_value+'&page='+page);
      }
  }
  

  getSearchContent(){
    page=1;
    this.page_no=page;
    this.genre_value="";
    Search_value=this.searchForm.value.movieName;
      if(Search_value){
        this.sortby_value=Search_value;
        let SEARCH_URL=myAppConfig.tmdb.movieBaseUrl+"/search/movie?"+myAppConfig.tmdb.apikey+'&query='+Search_value+'&page='+page;
        this.getMoviesData(SEARCH_URL)
        this.ishidedrop=true;
      }
      else{
        this.ishidedrop=false;
        sort_by_desc="popularity.desc";
        this.sortby_value='Movies Trending Now';
        let  api_url=myAppConfig.tmdb.movieBaseUrl+'/discover/movie?sort_by='+sort_by_desc+'&'+myAppConfig.tmdb.apikey+'&page='+page;
        this.getMoviesData(api_url)  
       
      }
  }

  getGenreContent(id:any,name:string){
    genre_id=id;
    this.genre_value=name+' Movies';
    if(Search_value==""){
      this.ishidedrop=false;
      page=1;
      this.page_no=page;
      if(sort_by_desc=='upcoming.desc'){
        let genre_api_url=myAppConfig.tmdb.movieBaseUrl+'/movie/upcoming?'+myAppConfig.tmdb.apikey+'&page='+page+'&with_genres='+genre_id;
        this.getMoviesData(genre_api_url);
      }
      else if(sort_by_desc=='nowplaying.desc'){
        let genre_api_url=myAppConfig.tmdb.movieBaseUrl+'/movie/now_playing?'+myAppConfig.tmdb.apikey+'&page='+page+'&with_genres='+genre_id;
        this.getMoviesData(genre_api_url);
      }
      else{
        let genre_api_url=myAppConfig.tmdb.movieBaseUrl+'/discover/movie?'+myAppConfig.tmdb.apikey+'&page='+page+'&with_genres='+genre_id+'&sort_by='+sort_by_desc;
        this.getMoviesData(genre_api_url);
      }
    }else{
      this.ishidedrop=true;
      page=1;
      this.page_no=page;
      this.sortby_value=Search_value;
      this.genre_value="";
      let genre_api_url=myAppConfig.tmdb.movieBaseUrl+'/search/movie?'+myAppConfig.tmdb.apikey+'&query='+Search_value+'&page='+page;
      this.getMoviesData(genre_api_url)
    }
  }

  getOrderContent(sortBy:string,name:string){
    sort_by_desc=sortBy;
    this.sortby_value=name;
    
    if(Search_value==""){
      page=1;
      this.ishidedrop=false;
      this.page_no=page;
      if(sortBy=='upcoming.desc'){
        let api_url=myAppConfig.tmdb.movieBaseUrl+'/movie/upcoming?'+myAppConfig.tmdb.apikey+'&page='+page+'&with_genres='+genre_id;
        this.getMoviesData(api_url);
      }
      else if(sort_by_desc=='nowplaying.desc'){
        let api_url=myAppConfig.tmdb.movieBaseUrl+'/movie/now_playing?'+myAppConfig.tmdb.apikey+'&page='+page+'&with_genres='+genre_id;
        this.getMoviesData(api_url);
      }
      else{
        let sort_api_url=myAppConfig.tmdb.movieBaseUrl+'/discover/movie?sort_by='+sort_by_desc+'&'+myAppConfig.tmdb.apikey+'&page='+page+'&with_genres='+genre_id;
        this.getMoviesData(sort_api_url);
      }
    }
    else{
     page=1;
      this.page_no=page;
      this.ishidedrop=true;
      this.sortby_value=Search_value;
      this.genre_value="";
      let genre_api_url=myAppConfig.tmdb.movieBaseUrl+'/search/movie?'+myAppConfig.tmdb.apikey+'&query='+Search_value+'&page='+page;
      this.getMoviesData(genre_api_url)
    }
  }
  
  handlePagination(val:any){
    if(Search_value==""){
      this.ishidedrop=false;
      if(val==1){
        page=1;
        this.page_no=page;
      }else if(val==2){
        if(page==1){
          this.isdisableprev=true
        }else{
          page--;
          this.page_no=page;
        }
      }else{
        page++;
        this.page_no=page;
      }
      if(sort_by_desc=='upcoming.desc'){
        let api_url=myAppConfig.tmdb.movieBaseUrl+'/movie/upcoming?'+myAppConfig.tmdb.apikey+'&page='+page+'&with_genres='+genre_id;;
        this.getMoviesData(api_url);
      }
      else if(sort_by_desc=='nowplaying.desc'){
        let api_url=myAppConfig.tmdb.movieBaseUrl+'/movie/now_playing?'+myAppConfig.tmdb.apikey+'&page='+page+'&with_genres='+genre_id;
        this.getMoviesData(api_url);
      }
      else{
        var page_api_url=myAppConfig.tmdb.movieBaseUrl+'/discover/movie?sort_by='+sort_by_desc+'&'+myAppConfig.tmdb.apikey+'&page='+page+'&with_genres='+genre_id;
        this.getMoviesData(page_api_url);
      }
    }
    else{
      this.ishidedrop=true;
      if(val==1){
        page=1;
        this.page_no=page;
      }else if(val==2){
        if(page==1){
          this.isdisableprev=true
        }else{
          page--;
          this.page_no=page;
        }
      }else{
        page++;
        this.page_no=page;
      }
      var page_api_url=myAppConfig.tmdb.movieBaseUrl+'/search/movie?'+myAppConfig.tmdb.apikey+'&query='+Search_value+'&page='+page;
      this.getMoviesData(page_api_url)
    }
  }

 

  getMoviesData(url:any) { 
    this.movieservice.getallMovies(url);

    let tempMoviesList:any;
    this.movieservice.moviesData.subscribe((data)=>{
       tempMoviesList=data;
       this.movieList=tempMoviesList.results;
     

       if(tempMoviesList.total_results==0){
        const Ele= window.document.getElementById("no-record");
        Ele?.classList.remove('d-none');
        const Element= window.document.getElementById("pagination");
        Element?.classList.add('d-none');
      }else{
        const Elemen= window.document.getElementById("pagination");
        Elemen?.classList.remove('d-none');
      }

      if(tempMoviesList.total_pages==page){
        this.isdisablenext=true;
      }else{
        this.isdisablenext=false;
      }

      if(page==1){
        this.isdisableprev=true;
      }else{
        this.isdisableprev=false;
      }
    });  
  }


  float2int (value:any) {
    return value | 0;
  }



  scrollToTop(el:any) {
    el.scrollTop = 0;
  }
}
