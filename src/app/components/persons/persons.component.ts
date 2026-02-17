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
  totalPages: number = 1;
  isFetching: boolean = false;
  isLoadingMore: boolean = false;

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
    if (Search_value.trim() == '') {
      let api_url =
        myAppConfig.tmdb.personBaseUrl +
        'popular?' +
        myAppConfig.tmdb.apikey +
        '&page=' +
        page;
      this.getPeoplesData(api_url, false);
    } else {
      this.sortby_value = Search_value;
      this.getPeoplesData(
        myAppConfig.tmdb.baseUrl +
          'search/person?' +
          myAppConfig.tmdb.apikey +
          '&query=' +
          Search_value +
          '&page=' +
          page,
        false
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
      this.getPeoplesData(SEARCH_URL, false);
    } else {
      Search_value = '';
      this.sortby_value = 'Popular Peoples';
      let api_url =
        myAppConfig.tmdb.personBaseUrl +
        'popular?' +
        myAppConfig.tmdb.apikey +
        '&page=' +
        page;
      this.getPeoplesData(api_url, false);
    }
  }

  getPeoplesData(apiurl: any, append: boolean = false) {
    if (this.isFetching) {
      return;
    }
    this.isFetching = true;
    this.isLoadingMore = append;
    this.peopleservice.getPopularPeopleDetails(apiurl).subscribe({
      next: (data: any) => {
        const temppeopleList = data.results || [];
        const mappedPeople = temppeopleList.map((person: any) => {
          const mapped = {} as common;
          mapped.id = person.id;
          mapped.title = person.name;
          mapped.popularity = person.popularity;
          mapped.poster_path = person.profile_path;
          mapped.job = person.known_for_department;
          return mapped;
        });

        if (append) {
          this.peopleList = [...this.peopleList, ...mappedPeople];
        } else {
          this.peopleList = mappedPeople;
        }

        this.totalPages = data.total_pages || 1;
        this.isFetching = false;
        this.isLoadingMore = false;
      },
      error: () => {
        this.isFetching = false;
        this.isLoadingMore = false;
      },
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (this.isFetching || page >= this.totalPages || this.peopleList.length === 0) {
      return;
    }
    const threshold = 450;
    const position = window.innerHeight + window.scrollY;
    const height = document.documentElement.scrollHeight;
    if (height - position < threshold) {
      this.loadNextPage();
    }
  }

  loadNextPage() {
    if (this.isFetching || page >= this.totalPages) {
      return;
    }
    page += 1;
    this.page_no = page;
    if (Search_value.trim() == '') {
      const api_url =
        myAppConfig.tmdb.personBaseUrl +
        'popular?' +
        myAppConfig.tmdb.apikey +
        '&page=' +
        page;
      this.getPeoplesData(api_url, true);
    } else {
      const SEARCH_URL =
        myAppConfig.tmdb.baseUrl +
        'search/person?' +
        myAppConfig.tmdb.apikey +
        '&query=' +
        Search_value +
        '&page=' +
        page;
      this.getPeoplesData(SEARCH_URL, true);
    }
  }

  float2int(value: any) {
    return value | 0;
  }
}
