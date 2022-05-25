import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import myAppConfig from 'src/app/config/my-app-config';
import { PeopleService } from 'src/app/services/people.service';

var page=1,Search_value="";
var sorts_by='Popular Peoples';
@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit {
  imgUrl:string=myAppConfig.tmdb.imgUrl;

  peopleList:any;
  
  sortby_value:string=sorts_by;
  page_no:number=page;
  searchForm!:FormGroup;
  isdisableprev:boolean=false;
  isdisablenext:boolean=false;


  constructor(private peopleservice:PeopleService) {this.searchForm=new FormGroup({
      'personName':new FormControl("")
    })
  }

  ngOnInit(): void {
    this.getPeoples()
  }



  getPeoples(){
    page=1;
    this.page_no=1;
    if(Search_value==" "|| Search_value==""){
      let api_url=myAppConfig.tmdb.personBaseUrl+'popular?'+myAppConfig.tmdb.apikey+'&page='+page;
      this.getPeoplesData(api_url);
    }else{
      this.sortby_value=Search_value;
      this.getPeoplesData(myAppConfig.tmdb.movieBaseUrl+'/search/person?'+myAppConfig.tmdb.apikey+'&query='+Search_value+'&page='+page);
    }
  }
  getSearchContent(){
    page=1;
    this.page_no=page;
    Search_value=this.searchForm.value.personName;
      if(Search_value){
        this.sortby_value=Search_value;
        let SEARCH_URL=myAppConfig.tmdb.movieBaseUrl+'/search/person?'+myAppConfig.tmdb.apikey+'&query='+Search_value+'&page='+page;
        this.getPeoplesData(SEARCH_URL)
      }
      else{
        this.sortby_value='Popular Peoples';
        let api_url=myAppConfig.tmdb.personBaseUrl+'popular?'+myAppConfig.tmdb.apikey+'&page='+page;
        this.getPeoplesData(api_url); 
      }
  }



  handlePagination(val:any){
    if(Search_value==""){
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
        let api_url=myAppConfig.tmdb.personBaseUrl+'popular?'+myAppConfig.tmdb.apikey+'&page='+page;
        this.getPeoplesData(api_url);
    }
    else{
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
      let SEARCH_URL=myAppConfig.tmdb.movieBaseUrl+'/search/person?'+myAppConfig.tmdb.apikey+'&query='+Search_value+'&page='+page;
        this.getPeoplesData(SEARCH_URL)
    }
  }


  getPeoplesData(apiurl: any) {
    this.peopleservice.getPopularPeopleDetails(apiurl);

    let temppeopleList:any;
    this.peopleservice.peoplesData.subscribe((data)=>{
       temppeopleList=data;
       this.peopleList=temppeopleList.results;
       if(temppeopleList.total_results==0){
        const Ele= window.document.getElementById("no-record");
        Ele?.classList.remove('d-none');
        const Element= window.document.getElementById("pagination");
        Element?.classList.add('d-none');
      }else{
        const Ele= window.document.getElementById("no-record");
        Ele?.classList.add('d-none');
        const Elemen= window.document.getElementById("pagination");
        Elemen?.classList.remove('d-none');
      }

      if(temppeopleList.total_pages==page){
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
}
