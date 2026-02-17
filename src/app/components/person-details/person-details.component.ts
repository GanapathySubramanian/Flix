import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonDetails } from 'src/app/core/interface/person-details';
import myAppConfig from 'src/app/core/config/my-app-config';
import { PeopleService } from 'src/app/core/services/people.service';

var person_id = '';
@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.css'],
})
export class PersonDetailsComponent implements OnInit {
  imgUrl: any = myAppConfig.tmdb.imgUrl;
  highqualityImgUrl: any = myAppConfig.tmdb.highQualityImgUrl;
  personDetails: PersonDetails = {} as PersonDetails;

  castTvList: any = [];
  castMovieList: any = [];
  crewTvList: any = [];
  crewMovieList: any = [];

  windowScrolled: boolean = false;
  activeTab: string = 'about';
  tabConfig = [
    { id: 'about', label: 'About', hasData: () => true },
    { id: 'acted-movies', label: 'Movies Acted', hasData: () => this.castMovieList?.length > 0 },
    { id: 'acted-tv', label: 'TV Shows Acted', hasData: () => this.castTvList?.length > 0 },
    { id: 'crew-movies', label: 'Crew Movies', hasData: () => this.crewMovieList?.length > 0 },
    { id: 'crew-tv', label: 'Crew TV Shows', hasData: () => this.crewTvList?.length > 0 },
  ];

  constructor(
    private route: ActivatedRoute,
    private peopleservice: PeopleService
  ) {
    let id = this.route.snapshot.params['id'];
    person_id = id;
  }

  ngOnInit(): void {
    this.getPersonDetails();
  }

  getPersonDetails() {
    let api_url =
      myAppConfig.tmdb.personBaseUrl +
      person_id +
      '?' +
      myAppConfig.tmdb.apikey;
    this.getPersonDetailsData(api_url);

    var movie_tvshows_credit =
      myAppConfig.tmdb.personBaseUrl +
      person_id +
      '/combined_credits?' +
      myAppConfig.tmdb.apikey;
    this.getCredits(movie_tvshows_credit);

    var external_ids =
      myAppConfig.tmdb.personBaseUrl +
      person_id +
      '/external_ids?' +
      myAppConfig.tmdb.apikey;
    this.getExternalid(external_ids);
  }

  getExternalid(external_ids: string) {
    let tempsociallinks: any;
    this.peopleservice.getSocialLinks(external_ids).subscribe((data) => {
      tempsociallinks = data;

      this.personDetails.facebook_id = tempsociallinks.facebook_id;
      this.personDetails.freebase_id = tempsociallinks.freebase_id;
      this.personDetails.instagram_id = tempsociallinks.instagram_id;
      this.personDetails.freebase_mid = tempsociallinks.freebase_mid;
      this.personDetails.tvrage_id = tempsociallinks.tvrage_id;
      this.personDetails.twitter_id = tempsociallinks.twitter_id;
      this.personDetails.imdb_id = tempsociallinks.imdb_id;
    });
  }

  getCredits(movie_tvshows_credit: string) {
    let tempcredit: any;
    this.peopleservice.getCredits(movie_tvshows_credit).subscribe((data) => {
      tempcredit = data;
      this.castMovieList = tempcredit.cast.filter(
        (cast: any) => cast.media_type === 'movie'
      );
      this.castTvList = tempcredit.cast
        .filter((cast: any) => cast.media_type === 'tv')
        .map((cast: any) => {
          const { name: title, ...rest } = cast;
          return { title, ...rest };
        });

      this.crewMovieList = tempcredit.crew.filter(
        (crew: any) => crew.media_type === 'movie'
      );
      this.crewTvList = tempcredit.crew
        .filter((crew: any) => crew.media_type === 'tv')
        .map((crew: any) => {
          const { name: title, ...rest } = crew;
          return { title, ...rest };
        });

      this.crewMovieList = this.filterCrewData(this.crewMovieList);
      this.crewTvList = this.filterCrewData(this.crewTvList);

      this.crewTvList = this.crewTvList.map((crew: any) => {
        const { name: title, ...rest } = crew;
        return { title, ...rest };
      });

      this.crewMovieList = this.crewMovieList.sort((a: any, b: any) =>
        a.release_date.localeCompare(b.release_date)
      );
      this.castMovieList = this.castMovieList.sort((a: any, b: any) =>
        a.release_date.localeCompare(b.release_date)
      );
      this.crewTvList = this.crewTvList.sort((a: any, b: any) =>
        a.first_air_date.localeCompare(b.first_air_date)
      );
      this.castTvList = this.castTvList.sort((a: any, b: any) =>
        a.first_air_date.localeCompare(b.first_air_date)
      );
    });
  }
  filterCrewData(arr: any): any {
    let clientImages: any = [];
    let c_data: any = [];

    arr.forEach((data: any) => {
      const { id, job } = data;
      if (clientImages[id]) {
        if (clientImages[id].includes(job)) {
          return;
        } else {
          clientImages[id] = clientImages[id] + ', ' + job;
        }
      } else {
        clientImages[id] = job;
      }
      c_data.push(data);
    });

    c_data = c_data.filter((obj: any, pos: any, arr: any) => {
      return arr.map((mapObj: any) => mapObj.id).indexOf(obj.id) === pos;
    });

    c_data.forEach((data: any) => {
      if (clientImages[data.id]) {
        data.job = clientImages[data.id];
      }
    });
    return c_data;
  }

  getPersonDetailsData(api_url: string) {
    let temppersondetails: any;
    this.peopleservice.getPersonDetails(api_url).subscribe((data) => {
      temppersondetails = data;

      this.personDetails.biography = temppersondetails.biography;
      this.personDetails.birthday = temppersondetails.birthday;

      if (temppersondetails.gender == 2) {
        this.personDetails.gender = 'Male';
      } else if (temppersondetails.gender == 1) {
        this.personDetails.gender = 'Female';
      } else {
        this.personDetails.gender = 'Others';
      }

      this.personDetails.homepage = temppersondetails.homepage;
      this.personDetails.id = temppersondetails.id;
      this.personDetails.imdb_id = temppersondetails.imdb_id;
      this.personDetails.known_for_department =
        temppersondetails.known_for_department;
      this.personDetails.name = temppersondetails.name;
      this.personDetails.place_of_birth = temppersondetails.place_of_birth;
      this.personDetails.popularity = temppersondetails.popularity;
      this.personDetails.profile_path = temppersondetails.profile_path;
    });
  }

  float2int(value: any) {
    return value | 0;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.scrollY > 1000) {
      this.windowScrolled = true;
    } else if (
      (this.windowScrolled && window.pageYOffset) ||
      document.documentElement.scrollTop ||
      document.body.scrollTop < 10
    ) {
      this.windowScrolled = false;
    }
  }

  scrollToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  getAvailableTabs() {
    return this.tabConfig.filter((tab) => tab.hasData());
  }

  setActiveTab(tabId: string) {
    this.activeTab = tabId;
  }
}
