import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import myAppConfig from 'src/app/core/config/my-app-config';
import { common } from 'src/app/core/interface/common';
import { PeopleService } from 'src/app/core/services/people.service';

var page = 1,
  Search_value = '';
var sorts_by = 'Popular Peoples';
@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css'],
})
export class PersonsComponent implements OnInit {
  imgUrl: string = myAppConfig.tmdb.imgUrl;
  mobiledevice: boolean = false;
  component: string = 'person';
  peopleList: common[] = [];

  sortby_value: string = sorts_by;
  page_no: number = page;
  searchForm!: FormGroup;
  isdisableprev: boolean = false;
  isdisablenext: boolean = false;

  constructor(private peopleservice: PeopleService) {
    this.searchForm = new FormGroup({
      personName: new FormControl(''),
    });
    this.getScreenSize();
  }

  scrHeight: any;
  scrWidth: any;

  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;
    if (this.scrWidth <= 500) {
      this.mobiledevice = true;
    } else {
      this.mobiledevice = false;
    }
  }
  ngOnInit(): void {
    this.getPeoples();
  }

  searchList: any = [];
  findthispeoples: string = '';
  findPeoples() {
    if (this.findthispeoples.length > 0) {
      let Ele1 = window.document.getElementById('search-list-lg');
      Ele1?.classList.remove('d-none');
      let Ele2 = window.document.getElementById('search-list-sm');
      Ele2?.classList.remove('d-none');
      let SEA_URL =
        myAppConfig.tmdb.baseUrl +
        'search/person?' +
        myAppConfig.tmdb.apikey +
        '&query=' +
        this.findthispeoples +
        '&page=' +
        page;

      this.loadPeoples(SEA_URL);
      // this.ishidedrop=true;
    } else {
      // this.ishidedrop=false;
      let Ele1 = window.document.getElementById('search-list-lg');
      Ele1?.classList.add('d-none');
      const Ele2 = window.document.getElementById('search-list-sm');
      Ele2?.classList.add('d-none');
    }
  }
  loadPeoples(personName: string) {
    let tempSearchList: any;
    this.peopleservice.getSearchPeoples(personName).subscribe((data) => {
      tempSearchList = data;
      this.searchList = tempSearchList.results;
    });
  }

  getPeoples() {
    page = 1;
    this.page_no = 1;
    if (Search_value == ' ' || Search_value == '') {
      let api_url =
        myAppConfig.tmdb.personBaseUrl +
        'popular?' +
        myAppConfig.tmdb.apikey +
        '&page=' +
        page;
      this.getPeoplesData(api_url);
    } else {
      this.sortby_value = Search_value;
      this.getPeoplesData(
        myAppConfig.tmdb.baseUrl +
          'search/person?' +
          myAppConfig.tmdb.apikey +
          '&query=' +
          Search_value +
          '&page=' +
          page
      );
    }
  }
  getSearchContent() {
    page = 1;
    this.page_no = page;
    Search_value = this.searchForm.value.personName;
    if (Search_value) {
      this.sortby_value = Search_value;
      let SEARCH_URL =
        myAppConfig.tmdb.baseUrl +
        'search/person?' +
        myAppConfig.tmdb.apikey +
        '&query=' +
        Search_value +
        '&page=' +
        page;
      this.findthispeoples = '';
      this.getPeoplesData(SEARCH_URL);
    } else {
      this.sortby_value = 'Popular Peoples';
      let api_url =
        myAppConfig.tmdb.personBaseUrl +
        'popular?' +
        myAppConfig.tmdb.apikey +
        '&page=' +
        page;
      this.getPeoplesData(api_url);
    }
  }

  handlePagination(val: any) {
    if (Search_value == '') {
      if (val == 1) {
        page = 1;
        this.page_no = page;
      } else if (val == 2) {
        if (page == 1) {
          this.isdisableprev = true;
        } else {
          page--;
          this.page_no = page;
        }
      } else {
        page++;
        this.page_no = page;
      }
      let api_url =
        myAppConfig.tmdb.personBaseUrl +
        'popular?' +
        myAppConfig.tmdb.apikey +
        '&page=' +
        page;
      this.getPeoplesData(api_url);
    } else {
      if (val == 1) {
        page = 1;
        this.page_no = page;
      } else if (val == 2) {
        if (page == 1) {
          this.isdisableprev = true;
        } else {
          page--;
          this.page_no = page;
        }
      } else {
        page++;
        this.page_no = page;
      }
      let SEARCH_URL =
        myAppConfig.tmdb.baseUrl +
        'search/person?' +
        myAppConfig.tmdb.apikey +
        '&query=' +
        Search_value +
        '&page=' +
        page;
      this.getPeoplesData(SEARCH_URL);
    }

    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  getPeoplesData(apiurl: any) {
    let temppeopleList: any;
    this.peopleservice
      .getPopularPeopleDetails(apiurl)
      .subscribe((data: any) => {
        temppeopleList = data.results;

        this.peopleList = [];
        for (let i = 0; i < temppeopleList.length; i++) {
          this.peopleList[i] = {} as common;
          this.peopleList[i].id = temppeopleList[i].id;
          this.peopleList[i].title = temppeopleList[i].name;
          this.peopleList[i].popularity = temppeopleList[i].popularity;
          this.peopleList[i].poster_path = temppeopleList[i].profile_path;
          this.peopleList[i].job = temppeopleList[i].known_for_department;
        }
        if (data.total_pages == page) {
          this.isdisablenext = true;
        } else {
          this.isdisablenext = false;
        }

        if (page == 1) {
          this.isdisableprev = true;
        } else {
          this.isdisableprev = false;
        }
      });
  }

  float2int(value: any) {
    return value | 0;
  }
}
