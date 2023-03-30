import { Component, HostListener, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/core/services/movies.service';
import myAppConfig from 'src/app/core/config/my-app-config';
import { FormControl, FormGroup } from '@angular/forms';
import { common } from 'src/app/core/interface/common';
import { COLLECTIONS } from 'src/app/core/constants/collections.constants';
var sort_by_desc = 'popularity.desc',
  page = 1,
  Search_value = '',
  genre_id = '';
var sorts_by = 'Trending Now',
  region = '';
@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css'],
})
export class CollectionsComponent implements OnInit {
  mobiledevice: boolean = false;
  component: string = 'movie';
  imgUrl: string = myAppConfig.tmdb.imgUrl;
  highqualityImgUrl: string = myAppConfig.tmdb.highQualityImgUrl;

  topMoviesList: any[] = [];
  movieList: common[] = [];
  genreList: any;
  orderList: any;
  countryList: any;

  page_no: number = page;
  genre_value: string = '';
  sortby_value: string = sorts_by;
  country_value: string = '';
  searchForm!: FormGroup;
  isdisableprev: boolean = false;
  isdisablenext: boolean = false;
  ishidedrop: boolean = false;
  collectionData: any[] = COLLECTIONS;
  constructor(private movieservice: MoviesService) {
    this.searchForm = new FormGroup({
      movieName: new FormControl(''),
    });
    if (Search_value == '') {
      this.ishidedrop = false;
    } else {
      this.ishidedrop = true;
    }
    this.getScreenSize();
  }

  ngOnInit(): void {
    this.getCollections();
  }
  getCollections() {
    this.collectionData.forEach((collection) => {
      var api_url =
        myAppConfig.tmdb.baseUrl +
        'collection/' +
        collection.id +
        '?' +
        myAppConfig.tmdb.apikey;

      this.getCollectionsdetails(api_url);
    });

    // this.getMoviesData(api_url);
  }
  getCollectionsdetails(api_url: string) {
    let tempMoviesList: any;
    this.movieservice.getallMovies(api_url).subscribe((data: any) => {
      if (!this.movieList.includes(data)) {
        this.movieList.push(data);
      }

      let result = this.sort_by_key(this.movieList, 'title');
      this.movieList = result;
    });
  }

  sort_by_key(array: any, key: any) {
    return array.sort((a: any, b: any) => {
      var x = a[key];
      var y = b[key];
      return x < y ? -1 : x > y ? 1 : 0;
    });
  }
  searchList: any = [];
  findthismovie: string = '';
  findMovies() {
    if (this.findthismovie.length > 0) {
      let Ele1 = window.document.getElementById('search-list-lg');
      Ele1?.classList.remove('d-none');
      let Ele2 = window.document.getElementById('search-list-sm');
      Ele2?.classList.remove('d-none');
      let SEA_URL =
        myAppConfig.tmdb.baseUrl +
        'search/collection?' +
        myAppConfig.tmdb.apikey +
        '&query=' +
        this.findthismovie +
        '&page=1';
      this.loadMovies(SEA_URL);
    } else {
      let Ele1 = window.document.getElementById('search-list-lg');
      Ele1?.classList.add('d-none');
      const Ele2 = window.document.getElementById('search-list-sm');
      Ele2?.classList.add('d-none');
    }
  }
  loadMovies(movieName: string) {
    let tempSearchList: any;
    this.movieservice.getSearchMovies(movieName).subscribe((data) => {
      tempSearchList = data;
      this.searchList = tempSearchList.results;
    });
  }

  getSearchContent() {
    page = 1;
    this.page_no = page;
    this.genre_value = '';
    Search_value = this.searchForm.value.movieName;
    if (Search_value) {
      this.sortby_value = Search_value;
      let SEARCH_URL =
        myAppConfig.tmdb.baseUrl +
        'search/collection?' +
        myAppConfig.tmdb.apikey +
        '&query=' +
        Search_value +
        '&page=' +
        page;
      this.getMoviesData(SEARCH_URL);
      this.findthismovie = '';
      this.ishidedrop = true;
    } else {
      this.ishidedrop = false;
      sort_by_desc = 'popularity.desc';
      this.sortby_value = 'Trending Now';
      this.country_value = '';
      let api_url =
        myAppConfig.tmdb.baseUrl +
        'search/collection?' +
        myAppConfig.tmdb.apikey +
        '&page=' +
        page;
      this.getMoviesData(api_url);
    }
  }

  // handlePagination(val: any) {
  //   if (Search_value == '') {
  //     this.ishidedrop = false;
  //     if (val == 1) {
  //       page = 1;
  //       this.page_no = page;
  //     } else if (val == 2) {
  //       if (page == 1) {
  //         this.isdisableprev = true;
  //       } else {
  //         page--;
  //         this.page_no = page;
  //       }
  //     } else {
  //       page++;
  //       this.page_no = page;
  //     }
  //   } else {
  //     this.ishidedrop = true;
  //     if (val == 1) {
  //       page = 1;
  //       this.page_no = page;
  //     } else if (val == 2) {
  //       if (page == 1) {
  //         this.isdisableprev = true;
  //       } else {
  //         page--;
  //         this.page_no = page;
  //       }
  //     } else {
  //       page++;
  //       this.page_no = page;
  //     }
  //     var page_api_url =
  //       myAppConfig.tmdb.baseUrl +
  //       '/search/collection?' +
  //       myAppConfig.tmdb.apikey +
  //       '&query=' +
  //       Search_value +
  //       '&page=' +
  //       page;
  //     this.getMoviesData(page_api_url);
  //   }

  //   window.scroll({
  //     top: 0,
  //     left: 0,
  //     behavior: 'smooth',
  //   });
  // }

  getMoviesData(url: any) {
    let tempMoviesList: any;
    this.movieservice.getallMovies(url).subscribe((data: any) => {
      tempMoviesList = data.results;
      this.movieList = [];
      this.movieList = tempMoviesList;
      this.topMoviesList = [];
      this.movieList.forEach((movies: any, index) => {
        movies.background_image = this.highqualityImgUrl + movies.backdrop_path;
        movies.no_animation = true;
        if (index < 10) {
          if (movies.backdrop_path) this.topMoviesList.push(movies);
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
    if (this.scrWidth <= 500) {
      this.mobiledevice = true;
    } else {
      this.mobiledevice = false;
    }
  }
}
