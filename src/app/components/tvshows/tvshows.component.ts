import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import myAppConfig from 'src/app/core/config/my-app-config';
import { common } from 'src/app/core/interface/common';
import { MoviesService } from 'src/app/core/services/movies.service';
import { TvshowsService } from 'src/app/core/services/tvshows.service';

var sort_by_desc = 'popularity.desc',
  page = 1,
  Search_value = '',
  genre_id = '';
var sorts_by = 'Trending Now',
  region = '',
  network = '';

const SEARCH_URL =
  'https://api.themoviedb.org/3/search/tv?' + myAppConfig.tmdb.apikey;

@Component({
  selector: 'app-tvshows',
  templateUrl: './tvshows.component.html',
  styleUrls: ['./tvshows.component.css'],
})
export class TvshowsComponent implements OnInit {
  mobiledevice: boolean = false;
  component: string = 'tvshow';
  imgUrl: string = myAppConfig.tmdb.imgUrl;
  highqualityImgUrl: string = myAppConfig.tmdb.highQualityImgUrl;
  topTvshowList: any = [];
  tvshowList: common[] = [];
  orderList: any;
  genreList: any;
  countryList: any;
  networkList: any;
  searchList: any = [];

  country: string = '';
  page_no: number = page;
  genre_value: string = '';
  sortby_value: string = sorts_by;
  network_value: string = '';
  network_homepage: string = '';
  findthistvshow: string = '';
  searchForm!: FormGroup;
  isdisableprev: boolean = false;
  isdisablenext: boolean = false;
  ishidedrop: boolean = false;
  constructor(
    private tvshowservice: TvshowsService,
    private movieservice: MoviesService
  ) {
    this.searchForm = new FormGroup({
      tvshowName: new FormControl(''),
    });
    if (Search_value == '') {
      this.ishidedrop = false;
    } else {
      this.ishidedrop = true;
    }
    this.getScreenSize();
  }

  ngOnInit(): void {
    this.getGenre();
    this.getOrder();
    this.getNetwork();
    this.gettvshows();
    this.getCountries();
  }

  getOrder() {
    this.tvshowservice.getOrderList().subscribe((data) => {
      this.orderList = data;
    });
  }
  getGenre() {
    this.tvshowservice.getGenreList().subscribe((data) => {
      this.genreList = data;
    });
  }

  getNetwork() {
    this.tvshowservice.getNetworkList().subscribe((data) => {
      this.networkList = data;
    });
  }

  getCountries() {
    var country_url =
      myAppConfig.tmdb.movieBaseUrl +
      '/configuration/countries?' +
      myAppConfig.tmdb.apikey;
    this.movieservice.getCountry(country_url);
    this.movieservice.countryData.subscribe((data) => {
      this.countryList = data;
      console.log(this.countryList);
    });
  }

  findTvshow() {
    console.log(this.findthistvshow);
    if (this.findthistvshow.length > 0) {
      let Ele1 = window.document.getElementById('search-list-lg');
      Ele1?.classList.remove('d-none');
      let Ele2 = window.document.getElementById('search-list-sm');
      Ele2?.classList.remove('d-none');
      let SEA_URL = SEARCH_URL + '&query=' + this.findthistvshow + '&page=1';

      this.loadTvshow(SEA_URL);
      // this.ishidedrop=true;
    } else {
      // this.ishidedrop=false;
      let Ele1 = window.document.getElementById('search-list-lg');
      Ele1?.classList.add('d-none');
      const Ele2 = window.document.getElementById('search-list-sm');
      Ele2?.classList.add('d-none');
    }
  }

  loadTvshow(movieName: string) {
    this.tvshowservice.getSearchTvshows(movieName);

    let tempSearchList: any;
    this.tvshowservice.searchtvshowsData.subscribe((data) => {
      tempSearchList = data;
      // console.log(data);
      this.searchList = tempSearchList.results;
    });
  }

  gettvshows() {
    page = 1;
    this.page_no = 1;
    this.genre_value = '';
    genre_id = '';
    if (Search_value == '') {
      this.ishidedrop = false;
      sort_by_desc = 'popularity.desc';
      this.sortby_value = 'Trending Now';
      let api_url =
        myAppConfig.tmdb.tvshowBaseUrl +
        myAppConfig.tmdb.apikey +
        '&sort_by=' +
        sort_by_desc +
        '&page=' +
        page;
      this.gettvshowsData(api_url);
    } else {
      this.ishidedrop = true;
      this.sortby_value = Search_value;
      this.gettvshowsData(
        SEARCH_URL + '&query=' + Search_value + '&page=' + page
      );
    }
  }

  getCountryContent(id: string, name: string) {
    if (id == '' && name == '') {
      region = '';
      this.country = '';
    } else {
      region = id;
      this.country = 'IN ' + name;
    }
    if (Search_value == '') {
      page = 1;
      this.ishidedrop = false;
      this.page_no = page;
      this.getFilterContent();
    }
  }

  getGenreContent(id: any, name: string) {
    if (id == '' && name == '') {
      genre_id = id;
      this.genre_value = name;
    } else {
      genre_id = id;
      this.genre_value = name + ' Tvshows';
    }
    if (Search_value == '') {
      page = 1;
      this.ishidedrop = false;
      this.page_no = page;
      this.getFilterContent();
    }
  }

  getNetworkContent(id: string, name: string, path: string, homepage: string) {
    if (id == '' && name == '' && path == '') {
      network = '';
      this.network_value = '';
    } else {
      network = id;
      this.network_value = path;
      this.network_homepage = homepage;
      console.log(homepage);
    }
    if (Search_value == '') {
      page = 1;
      this.ishidedrop = false;
      this.page_no = page;
      this.getFilterContent();
    }
  }

  getOrderContent(sortBy: string, name: string) {
    if (sortBy == '' && name == '') {
      sort_by_desc = 'popularity.desc';
      this.sortby_value = 'Trending Now';
    } else {
      sort_by_desc = sortBy;
      this.sortby_value = name;
    }
    if (Search_value == '') {
      page = 1;
      this.page_no = page;
      this.ishidedrop = false;
      this.getFilterContent();
    }
  }

  getSearchContent() {
    page = 1;
    this.page_no = page;
    this.genre_value = '';
    Search_value = this.searchForm.value.tvshowName;
    if (Search_value) {
      this.ishidedrop = true;
      this.sortby_value = Search_value;
      this.findthistvshow = '';
      this.network_value = '';
      this.gettvshowsData(SEARCH_URL + '&query=' + Search_value);
    } else {
      this.ishidedrop = false;
      this.sortby_value = 'Trending Now';
      let api_url =
        myAppConfig.tmdb.tvshowBaseUrl +
        myAppConfig.tmdb.apikey +
        '&sort_by=' +
        sort_by_desc +
        '&page=' +
        page;
      this.gettvshowsData(api_url);
    }
  }

  handlePagination(val: any) {
    if (Search_value == '') {
      this.ishidedrop = false;
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
      this.getFilterContent();
    } else {
      this.ishidedrop = true;
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
      var page_api_url =
        SEARCH_URL + '&query=' + Search_value + '&page=' + page;
      this.gettvshowsData(page_api_url);
    }

    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  getFilterContent() {
    if (sort_by_desc == 'airingtoday.desc') {
      let api_url =
        myAppConfig.tmdb.tvshowDetailsBaseUrl +
        'airing_today?' +
        myAppConfig.tmdb.apikey +
        '&page=' +
        page +
        '&with_genres=' +
        genre_id +
        '&region=' +
        region +
        '&with_networks=' +
        network;
      this.gettvshowsData(api_url);
    } else if (sort_by_desc == 'ontheair.desc') {
      let api_url =
        myAppConfig.tmdb.tvshowDetailsBaseUrl +
        'on_the_air?' +
        myAppConfig.tmdb.apikey +
        '&page=' +
        page +
        '&with_genres=' +
        genre_id +
        '&region=' +
        region +
        '&with_networks=' +
        network;
      this.gettvshowsData(api_url);
    } else {
      let genre_api_url =
        myAppConfig.tmdb.tvshowBaseUrl +
        myAppConfig.tmdb.apikey +
        '&page=' +
        page +
        '&with_genres=' +
        genre_id +
        '&sort_by=' +
        sort_by_desc +
        '&region=' +
        region +
        '&with_networks=' +
        network;
      this.gettvshowsData(genre_api_url);
    }
  }

  gettvshowsData(api_url: string) {
    this.tvshowservice.getallTvshows(api_url);

    let tempTvshowList: any;
    this.tvshowservice.tvshowsData.subscribe((data: any) => {
      tempTvshowList = data.results;
      this.tvshowList = [];
      this.tvshowList = tempTvshowList;
      this.topTvshowList = [];

      this.tvshowList.forEach((movies: any, index) => {
        movies.background_image = this.highqualityImgUrl + movies.backdrop_path;
        movies.no_animation = true;
        if (index < 10) {
          this.topTvshowList.push(movies);
        }
      });

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

  scrollToTop(el: any) {
    el.scrollTop = 0;
  }

  scrHeight: any;
  scrWidth: any;

  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;
    console.log(this.scrHeight, this.scrWidth);
    if (this.scrWidth <= 500) {
      this.mobiledevice = true;
    } else {
      this.mobiledevice = false;
    }
  }
}
