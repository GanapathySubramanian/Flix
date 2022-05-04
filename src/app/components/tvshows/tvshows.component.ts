import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import myAppConfig from 'src/app/config/my-app-config';
import { TvshowsService } from 'src/app/services/tvshows.service';


var sort_by_desc="popularity.desc",page=1,Search_value="",genre_id="";
var sorts_by='Trending Now'

const SEARCH_URL="https://api.themoviedb.org/3/search/tv?"+myAppConfig.tmdb.apikey;

@Component({
  selector: 'app-tvshows',
  templateUrl: './tvshows.component.html',
  styleUrls: ['./tvshows.component.css']
})
export class TvshowsComponent implements OnInit {

  imgUrl:string=myAppConfig.tmdb.imgUrl;

  tvshowList:any;
  orderList:any;
  genreList:any;

  page_no:number=page;
  genre_value:string="";
  sortby_value:string=sorts_by;
  searchForm!:FormGroup;
  isdisableprev:boolean=false;
  isdisablenext:boolean=false;
  ishidedrop:boolean=false;
  constructor(private tvshowservice:TvshowsService) { 
    this.searchForm=new FormGroup({
      'tvshowName':new FormControl("")
    });
    if(Search_value==""){
      this.ishidedrop=false;
      
    }else{
      this.ishidedrop=true;
    }
  }

  ngOnInit(): void {
    this.getGenre();
    this.getOrder();
    this.gettvshows();
  }
  
  gettvshows() {
    page=1;
    this.page_no=1;
    this.genre_value="";
    genre_id=""
    if(Search_value==""){
      this.ishidedrop=false;
      sort_by_desc="popularity.desc";
      this.sortby_value='Trending Now';
      let api_url=myAppConfig.tmdb.tvshowBaseUrl+myAppConfig.tmdb.apikey+'&sort_by='+sort_by_desc+'&page='+page;
      this.gettvshowsData(api_url)
    }else{
      this.ishidedrop=true;
      this.sortby_value=Search_value;
      this.gettvshowsData(SEARCH_URL+'&query='+Search_value+'&page='+page)
    }
    
  }

  getOrder() {
    this.tvshowservice.getOrderList().subscribe((data)=>{
      this.orderList=data;
     
      
    })
  }
  getGenre() {
    this.tvshowservice.getGenreList().subscribe((data)=>{
      this.genreList=data;
    })
  }


  getGenreContent(id:any,name:string){
    genre_id=id;
    this.genre_value=name+' Tvshows';
    if(Search_value==""){
      page=1;
      this.ishidedrop=false;
      this.page_no=page;
      if(sort_by_desc=='airingtoday.desc'){
        let api_url=myAppConfig.tmdb.tvshowDetailsBaseUrl+'airing_today?'+myAppConfig.tmdb.apikey+'&page='+page+'&with_genres='+genre_id;
        this.gettvshowsData(api_url);
      }
      else if(sort_by_desc=='ontheair.desc'){
        let api_url=myAppConfig.tmdb.tvshowDetailsBaseUrl+'on_the_air?'+myAppConfig.tmdb.apikey+'&page='+page+'&with_genres='+genre_id;
        this.gettvshowsData(api_url);
      }
      else{
      let genre_api_url=myAppConfig.tmdb.tvshowBaseUrl+myAppConfig.tmdb.apikey+'&page='+page+'&with_genres='+genre_id+'&sort_by='+sort_by_desc;
      this.gettvshowsData(genre_api_url);
      }
    }else{
      this.ishidedrop=true;
      page=1;
      this.page_no=page;
      this.sortby_value=Search_value;
      this.genre_value="";
      let genre_api_url=SEARCH_URL+'&query='+Search_value+'&page='+page;
      this.gettvshowsData(genre_api_url);
    }
  }


  getOrderContent(sortBy:string,name:string){
    sort_by_desc=sortBy;
    this.sortby_value=name;
    if(Search_value==""){
      page=1;
      this.page_no=page;
      this.ishidedrop=false;
      if(sortBy=='airingtoday.desc'){
        let api_url=myAppConfig.tmdb.tvshowDetailsBaseUrl+'airing_today?'+myAppConfig.tmdb.apikey+'&page='+page+'&with_genres='+genre_id;
        this.gettvshowsData(api_url);
      }
      else if(sort_by_desc=='ontheair.desc'){
        let api_url=myAppConfig.tmdb.tvshowDetailsBaseUrl+'on_the_air?'+myAppConfig.tmdb.apikey+'&page='+page+'&with_genres='+genre_id;
        this.gettvshowsData(api_url);
      }
      else{
        let sort_api_url=myAppConfig.tmdb.tvshowBaseUrl+myAppConfig.tmdb.apikey+'&language=en-US&sort_by='+sort_by_desc+'&page='+page+'&with_genres='+genre_id;
        this.gettvshowsData(sort_api_url);
      }
    }
    else{
      this.ishidedrop=true;
     page=1;
      this.page_no=page;
      this.sortby_value=Search_value;
      this.genre_value="";
      let sort_api_url=SEARCH_URL+'&query'+Search_value+'&page='+page;
        this.gettvshowsData(sort_api_url);
    }
  }


  getSearchContent(){
    page=1;
    this.page_no=page;
    this.genre_value="";

    Search_value=this.searchForm.value.tvshowName;
    if(Search_value){
      this.ishidedrop=true;
      this.sortby_value=Search_value;
      this.gettvshowsData(SEARCH_URL+'&query='+Search_value);
    }else{
      this.ishidedrop=false;
    this.sortby_value='Trending Now';
    let api_url=myAppConfig.tmdb.tvshowBaseUrl+myAppConfig.tmdb.apikey+'&sort_by='+sort_by_desc+'&page='+page;
    this.gettvshowsData(api_url)
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
          this.isdisableprev=true;
        }else{
          page--;
          this.page_no=page;
        }
      }else{
        page++;
        this.page_no=page;
      }
      if(sort_by_desc=='airingtoday.desc'){
        let api_url=myAppConfig.tmdb.tvshowDetailsBaseUrl+'airing_today?'+myAppConfig.tmdb.apikey+'&page='+page+'&with_genres='+genre_id;
        this.gettvshowsData(api_url);
      }
      else if(sort_by_desc=='ontheair.desc'){
        let api_url=myAppConfig.tmdb.tvshowDetailsBaseUrl+'on_the_air?'+myAppConfig.tmdb.apikey+'&page='+page+'&with_genres='+genre_id;
        this.gettvshowsData(api_url);
      }
      else{
        let page_api_url=myAppConfig.tmdb.tvshowBaseUrl+myAppConfig.tmdb.apikey+'&language=en-US&sort_by='+sort_by_desc+'&with_genres='+genre_id+'&page='+page;
        this.gettvshowsData(page_api_url);
      }
    }else{
      this.ishidedrop=true;
      if(val==1){
        page=1;
        this.page_no=page;
      }else if(val==2){
        if(page==1){
          this.isdisableprev=true;
        }else{
          page--;
          this.page_no=page;
        }
      }else{
        page++;
        this.page_no=page;
      }
      var page_api_url=SEARCH_URL+'&query='+Search_value+'&page='+page;
      this.gettvshowsData(page_api_url);
    }
   
  }



  gettvshowsData(api_url: string) {
    this.tvshowservice.getallTvshows(api_url);

    let tempTvshowList:any;
    this.tvshowservice.tvshowsData.subscribe((data)=>{
      tempTvshowList=data;
   
      this.tvshowList=tempTvshowList.results;
      
      if(tempTvshowList.total_results==0){
        const Ele= window.document.getElementById("no-record");
        Ele?.classList.remove('d-none');
        const Element= window.document.getElementById("pagination");
        Element?.classList.add('d-none');
      }else{
        const Elemen= window.document.getElementById("pagination");
        Elemen?.classList.remove('d-none');
      }

      if(tempTvshowList.total_pages==page){
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


  scrollToTop(el:any) {
    el.scrollTop = 0;
  }


}
