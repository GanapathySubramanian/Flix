import { Component, OnInit } from '@angular/core';
import myAppConfig from 'src/app/config/my-app-config';
import { MoviesService } from 'src/app/services/movies.service';

var page=1,genre_id="";

@Component({
  selector: 'app-upcoming-movies',
  templateUrl: './upcoming-movies.component.html',
  styleUrls: ['./upcoming-movies.component.css']
})
export class UpcomingMoviesComponent implements OnInit {

  imgUrl:String=myAppConfig.tmdb.imgUrl;

  upcomingList:any;
  genreList:any;
  page_no:number=page;
  genre_value:any="";

  isdisableprev:boolean=false;
  isdisablenext:boolean=false;

  constructor(private movieservice:MoviesService) { }

  ngOnInit(): void {
    this.getUpcoming()
    this.getGenre()
  }

  getGenre() {
    this.movieservice.getGenreList().subscribe((data)=>{
      this.genreList=data;
    })
  }
  
  getUpcoming() {
    genre_id='';
    page=1;
    this.page_no=1;
    let api_url=myAppConfig.tmdb.movieBaseUrl+'/movie/upcoming?'+myAppConfig.tmdb.apikey+'&page='+page;
    this.getUpcomingData(api_url);
  }

  
  getGenreContent(id:any,name:string){
    genre_id=id;
    this.genre_value=name+' Movies';
      page=1;
      this.page_no=page;
      let genre_api_url=myAppConfig.tmdb.movieBaseUrl+'/movie/upcoming?'+myAppConfig.tmdb.apikey+'&page='+page+'&with_genres='+genre_id;
      this.getUpcomingData(genre_api_url);
  }
  handlePagination(val:any){
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
      var page_api_url=myAppConfig.tmdb.movieBaseUrl+'/movie/upcoming?'+myAppConfig.tmdb.apikey+'&page='+page+'&with_genres='+genre_id;
      this.getUpcomingData(page_api_url);
    }



  getUpcomingData(url: any) {
    this.movieservice.getUpcomingMovies(url);

      let tempUpcomings:any;
      this.movieservice.upcomingData.subscribe((data)=>{
      tempUpcomings=data;
      this.upcomingList=tempUpcomings.results;

      if(tempUpcomings.total_results==0){
        const Ele= window.document.getElementById("no-record");
        Ele?.classList.remove('d-none');
        const Element= window.document.getElementById("pagination");
        Element?.classList.add('d-none');
      }else{
        const Elemen= window.document.getElementById("pagination");
        Elemen?.classList.remove('d-none');
      }

      if(tempUpcomings.total_pages==page){
        this.isdisablenext=true;
      }else{
        this.isdisablenext=false;
      }

      if(page==1){
        this.isdisableprev=true;
      }else{
        this.isdisableprev=false;
      }
    })

  }



  
  float2int (value:any) {
    return value | 0;
  }


}
