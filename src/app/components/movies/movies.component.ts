import { AfterViewInit, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/core/services/movies.service';
import myAppConfig from 'src/app/core/config/my-app-config';
import { FormControl, FormGroup } from '@angular/forms';
import { common } from 'src/app/core/interface/common';
import { forkJoin } from 'rxjs';
var sort_by_desc = 'popularity.desc',
  page = 1,
  Search_value = '',
  genre_id = '';
var sorts_by = 'Trending Now',
  region = '';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit, AfterViewInit, OnDestroy {
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
  genreQuery: string = '';
  orderQuery: string = '';
  countryQuery: string = '';
  private activeDropdowns: number = 0;
  private previousBodyOverflow: string = '';
  private dropdownShownHandler = (event: Event) => this.onDropdownShown(event);
  private dropdownHiddenHandler = (event: Event) => this.onDropdownHidden(event);

  constructor(private movieservice: MoviesService) {}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      movieName: new FormControl(''),
    });
    this.getScreenSize();
    this.loadData();
  }

  ngAfterViewInit(): void {
    document.addEventListener('shown.bs.dropdown', this.dropdownShownHandler as EventListener);
    document.addEventListener('hidden.bs.dropdown', this.dropdownHiddenHandler as EventListener);
  }

  ngOnDestroy(): void {
    document.removeEventListener('shown.bs.dropdown', this.dropdownShownHandler as EventListener);
    document.removeEventListener('hidden.bs.dropdown', this.dropdownHiddenHandler as EventListener);
    this.unlockBodyScroll(true);
  }

  loadData(): void {
    forkJoin([
      this.movieservice.getCountry(),
      this.movieservice.getOrderList(),
      this.movieservice.getGenreList(),
    ]).subscribe(([countryData, orderData, genreData]) => {
      this.countryList = countryData;
      this.orderList = orderData;
      this.genreList = genreData;
      this.getMovies();
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
        'search/movie?' +
        myAppConfig.tmdb.apikey +
        '&query=' +
        this.findthismovie +
        '&page=1' +
        '&sort_by=popular.desc';
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
  getMovies() {
    page = 1;
    this.page_no = 1;
    this.genre_value = '';
    genre_id = '';
    sort_by_desc = 'popularity.desc';
    this.sortby_value = 'Trending Now';
    let apiurl =
      myAppConfig.tmdb.baseUrl +
      'discover/movie?sort_by=' +
      sort_by_desc +
      '&' +
      myAppConfig.tmdb.apikey +
      '&page=' +
      page;
    this.getMoviesData(apiurl);
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
        'search/movie?' +
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
        'discover/movie?sort_by=' +
        sort_by_desc +
        '&' +
        myAppConfig.tmdb.apikey +
        '&page=' +
        page;
      this.getMoviesData(api_url);
    }
  }

  getCountryContent(id: string, name: string) {
    region = id;
    if (id == '' && name == '') {
      this.country_value = '';
      region = '';
    } else {
      this.country_value = name;
    }
    this.countryQuery = '';
    if (Search_value == '') {
      this.ishidedrop = false;
      page = 1;
      this.page_no = page;
      this.getFilterContent();
    }
  }
  getGenreContent(id: any, name: string) {
    genre_id = id;
    if (id == '' && name == '') {
      this.genre_value = '';
    } else {
      this.genre_value = name + ' Movies';
    }
    if (Search_value == '') {
      this.ishidedrop = false;
      page = 1;
      this.page_no = page;
      this.getFilterContent();
    }
    this.genreQuery = '';
  }

  getOrderContent(sortBy: string, name: string) {
    sort_by_desc = sortBy;
    if (sortBy == '' && name == '') {
      this.sortby_value = 'Trending Now';
      sort_by_desc = 'popularity.desc';
    } else {
      this.sortby_value = name;
    }
    this.orderQuery = '';
    if (Search_value == '') {
      page = 1;
      this.ishidedrop = false;
      this.page_no = page;
      this.getFilterContent();
    }
  }

  getFilterContent() {
    if (sort_by_desc == 'upcoming.desc') {
      let api_url =
        myAppConfig.tmdb.baseUrl +
        'movie/upcoming?' +
        myAppConfig.tmdb.apikey +
        '&page=' +
        page +
        '&with_genres=' +
        genre_id +
        '&region=' +
        region;
      this.getMoviesData(api_url);
    } else if (sort_by_desc == 'nowplaying.desc') {
      let api_url =
        myAppConfig.tmdb.baseUrl +
        'movie/now_playing?' +
        myAppConfig.tmdb.apikey +
        '&page=' +
        page +
        '&with_genres=' +
        genre_id +
        '&region=' +
        region;
      this.getMoviesData(api_url);
    } else {
      let sort_api_url =
        myAppConfig.tmdb.baseUrl +
        'discover/movie?sort_by=' +
        sort_by_desc +
        '&' +
        myAppConfig.tmdb.apikey +
        '&page=' +
        page +
        '&with_genres=' +
        genre_id +
        '&region=' +
        region;
      this.getMoviesData(sort_api_url);
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
        myAppConfig.tmdb.baseUrl +
        'search/movie?' +
        myAppConfig.tmdb.apikey +
        '&query=' +
        Search_value +
        '&page=' +
        page;
      this.getMoviesData(page_api_url);
    }

    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

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

  getFilteredGenreList() {
    const query = this.genreQuery.trim().toLowerCase();
    if (!query) {
      return this.genreList || [];
    }
    return (this.genreList || []).filter((genre: any) =>
      `${genre?.name || ''}`.toLowerCase().includes(query)
    );
  }

  getFilteredOrderList() {
    const query = this.orderQuery.trim().toLowerCase();
    if (!query) {
      return this.orderList || [];
    }
    return (this.orderList || []).filter((order: any) =>
      `${order?.desc || ''}`.toLowerCase().includes(query)
    );
  }

  getFilteredCountryList() {
    const query = this.countryQuery.trim().toLowerCase();
    if (!query) {
      return this.countryList || [];
    }
    return (this.countryList || []).filter((country: any) =>
      `${country?.english_name || ''}`.toLowerCase().includes(query)
    );
  }

  private onDropdownShown(event: Event) {
    const target = event.target as HTMLElement;
    if (!target?.closest('.movies-section')) {
      return;
    }
    this.activeDropdowns += 1;
    this.lockBodyScroll();
  }

  private onDropdownHidden(event: Event) {
    const target = event.target as HTMLElement;
    if (!target?.closest('.movies-section')) {
      return;
    }
    this.activeDropdowns = Math.max(0, this.activeDropdowns - 1);
    if (this.activeDropdowns === 0) {
      this.unlockBodyScroll();
    }
  }

  private lockBodyScroll() {
    if (!this.previousBodyOverflow) {
      this.previousBodyOverflow = document.body.style.overflow || '';
    }
    document.body.style.overflow = 'hidden';
  }

  private unlockBodyScroll(force: boolean = false) {
    if (force || this.activeDropdowns === 0) {
      document.body.style.overflow = this.previousBodyOverflow;
      this.previousBodyOverflow = '';
    }
  }

  getMovieImages(id: number, index: number) {
    let tempimagesData: any;
    this.movieservice.getAllImages(id).subscribe((data: any) => {
      if (data.id === id) {
        tempimagesData = data;
        //Movie Logo Images
        if (tempimagesData.logos.length < 0) {
          this.topMoviesList[index].logoList.file_path = null;
        } else {
          this.topMoviesList[index].logoList = tempimagesData.logos[0];
        }
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
