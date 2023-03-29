import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import myAppConfig from '../config/my-app-config';
import { URL_CONSTANTS } from '../constants/url.constants';

@Injectable({
  providedIn: 'root',
})
export class TvshowsService {
  genre: Observable<any[]> = of([
    { id: 10759, name: 'Action & Adventures' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentary' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 10762, name: 'Kids' },
    { id: 9648, name: 'Mystery' },
    { id: 10763, name: 'News' },
    { id: 10764, name: 'Reality' },
    { id: 10765, name: 'Science-Fiction & Fantacy' },
    { id: 10766, name: 'Soap' },
    { id: 10767, name: 'Talk' },
    { id: 10768, name: 'War & Politics' },
    { id: 37, name: 'Western' },
  ]);
  sortBy: Observable<any[]> = of([
    { order: 'airingtoday.desc', desc: 'Airing Today' },
    { order: 'ontheair.desc', desc: 'On The Air' },
    { order: 'popularity.desc', desc: 'Trending Now' },
    { order: 'popularity.asc', desc: 'Old Low Trend' },
    { order: 'vote_average.desc', desc: 'Top Rated' },
    { order: 'vote_average.asc', desc: 'Low Rated' },
    { order: 'first_air_date.desc', desc: 'Release Date Des' },
    { order: 'first_air_date.asc', desc: 'Release Date Asc' },
  ]);
  networks: Observable<any[]> = of([
    {
      headquarters: 'Los Gatos, California',
      homepage: 'http://www.netflix.com',
      id: 213,
      logo_path: '/wwemzKWzjKYJFfCeiB57q3r4Bcm.png',
      name: 'Netflix',
      origin_country: '',
    },
    {
      headquarters: 'Santa Monica, California, USA',
      homepage: 'https://www.amazon.com',
      id: 1024,
      logo_path: '/ifhbNuuVnlwYy5oXA5VIb2YR8AZ.png',
      name: 'Amazon',
      origin_country: '',
    },
    {
      headquarters: '',
      homepage: 'https://www.hotstar.com/in',
      id: 3919,
      logo_path: '/uj1DxESgwGQ3lczzYwQu3oDx5xr.png',
      name: 'Disney+ Hotstar',
      origin_country: 'IN',
    },
    {
      headquarters: 'Mumbai',
      homepage: 'https://www.zee5.com/',
      id: 2590,
      logo_path: '/cakduIXxOWnOasbKSMZ6Xvw5REG.png',
      name: 'ZEE5',
      origin_country: 'IN',
    },
    {
      headquarters: '',
      homepage: 'http://www.voot.com',
      id: 2532,
      logo_path: '/8LplmEPunQzheRGqQgvHN4tPltg.png',
      name: 'VOOT',
      origin_country: 'IN',
    },
    {
      headquarters: '',
      homepage: '',
      id: 4008,
      logo_path: '/yXrkdA9NlUfX2mRDhPgk0ye9frq.png',
      name: 'JioCinema',
      origin_country: 'IN',
    },
    {
      headquarters: '',
      homepage: 'http://www.sunnetwork.in/',
      id: 3026,
      logo_path: '/wMXQJG788I3Zefh9RcgAAS3AyrA.png',
      name: 'Sun TV',
      origin_country: 'IN',
    },
    {
      headquarters: 'Chennai, Tamil Nadu, India',
      homepage: 'http://www.hotstar.com/channels/star-vijay',
      id: 501,
      logo_path: '/E4LG7cTNrM8wmuCVTFkoJIkst9.png',
      name: 'STAR Vijay',
      origin_country: 'IN',
    },
    {
      headquarters: '',
      homepage: '',
      id: 526,
      logo_path: '/a9g7n8Frkiaaf5olShkyhHTk6bC.png',
      name: 'Zee TV',
      origin_country: 'IN',
    },
    {
      headquarters: '',
      homepage: '',
      id: 524,
      logo_path: '/1qTv9p35O9i5x0Swg1VbfzLqYBq.png',
      name: 'Colors',
      origin_country: 'IN',
    },
    {
      headquarters: '',
      homepage: 'https://www.aha.video/',
      id: 3758,
      logo_path: '/whVDNlpH9Z9gqU3v6m4o4stnjgX.png',
      name: 'aha',
      origin_country: 'IN',
    },
    {
      headquarters: '',
      homepage: 'https://www.sonyliv.com/',
      id: 2646,
      logo_path: '/8FhUdXfYC3E2EfntzwCdHYvo4vt.png',
      name: 'Sony Liv',
      origin_country: 'IN',
    },
    {
      headquarters: 'San Bruno, California',
      homepage: 'https://www.youtube.com',
      id: 247,
      logo_path: '/9Ga8A5QegQmiSVHp4hyusfMfpVk.png',
      name: 'YouTube',
      origin_country: '',
    },
    {
      headquarters: 'Mumbai',
      homepage: 'https://www.altbalaji.com',
      id: 2112,
      logo_path: '/zZ8gquIrrBvDGyMMcsSgArRuzyh.png',
      name: 'ALTBalaji',
      origin_country: 'IN',
    },
    {
      headquarters: '',
      homepage: 'https://www.mxplayer.in',
      id: 2964,
      logo_path: '/xKMlXKggJ1mTsfC5OSnlBKuFccO.png',
      name: 'MX Player',
      origin_country: 'IN',
    },
    {
      headquarters: 'Mumbai, Maharashtra, India',
      homepage: 'https://erosnow.com/',
      id: 2716,
      logo_path: '/kY1Wu1MEh5whXqP5gEb4NZHJ2Lw.png',
      name: 'Eros Now',
      origin_country: 'IN',
    },
    {
      headquarters: '',
      homepage: 'https://lionsgateplay.com',
      id: 3464,
      logo_path: '/g4E5EZvFjVEwbCXDOnWpkaoh662.png',
      name: 'Lionsgate Play',
      origin_country: 'IN',
    },
    {
      headquarters: '',
      homepage: 'https://www.paramountplus.com',
      id: 4330,
      logo_path: '/fi83B1oztoS47xxcemFdPMhIzK.png',
      name: 'Paramount+',
      origin_country: 'US',
    },
    {
      headquarters: 'London, England',
      homepage: 'https://www.bbc.co.uk/bbcone',
      id: 4,
      logo_path: '/mVn7xESaTNmjBUyUtGNvDQd3CT1.png',
      name: 'BBC One',
      origin_country: 'GB',
    },
    {
      headquarters: 'Cupertino, California',
      homepage: 'https://www.apple.com/apple-tv-plus/',
      id: 2552,
      logo_path: '/4KAy34EHvRM25Ih8wb82AuGU7zJ.png',
      name: 'Apple TV+',
      origin_country: 'US',
    },
    {
      headquarters: '',
      homepage: '',
      id: 2828,
      logo_path: '/znFJryX0SQflQHmJcgbWkuvWN5N.png',
      name: 'Hungama',
      origin_country: 'IN',
    },
    {
      headquarters: 'Atlanta, Georgia',
      homepage: 'https://www.cartoonnetwork.com',
      id: 56,
      logo_path: '/c5OC6oVCg6QP4eqzW6XIq17CQjI.png',
      name: 'Cartoon Network',
      origin_country: 'US',
    },
    {
      headquarters: 'Mumbai',
      homepage: 'https://www.pogo.tv',
      id: 1439,
      logo_path: '/qAhtyf2OX0bowig8g8CgG9iViRb.png',
      name: 'Pogo',
      origin_country: 'IN',
    },
    {
      headquarters: 'New York City, New York ',
      homepage: 'https://www.nick.com',
      id: 13,
      logo_path: '/ikZXxg6GnwpzqiZbRPhJGaZapqB.png',
      name: 'Nickelodeon',
      origin_country: 'US',
    },
    {
      headquarters: 'New York City, New York',
      homepage: 'https://www.hbo.com',
      id: 49,
      logo_path: '/tuomPhY2UtuPTqqFnKMVHvSb724.png',
      name: 'HBO',
      origin_country: 'US',
    },
    {
      headquarters: 'New York City, New York',
      homepage: 'https://www.hbomax.com',
      id: 3186,
      logo_path: '/nmU0UMDJB3dRRQSTUqawzF2Od1a.png',
      name: 'HBO Max',
      origin_country: 'US',
    },
    {
      headquarters: 'Burbank, California',
      homepage: 'http://www.thewb.com',
      id: 21,
      logo_path: '/9GlDHjQj9c2dkfARCR3zlH87R66.png',
      name: 'The WB',
      origin_country: 'US',
    },
  ]);

  constructor(private http: HttpClient) {}

  getGenreList(): Observable<any[]> {
    return this.genre;
  }

  getOrderList(): Observable<any[]> {
    return this.sortBy;
  }

  getNetworkList(): Observable<any[]> {
    return this.networks;
  }

  getSearchTvshows(url: any): Observable<any> {
    return this.http.get(url);
  }
  getallTvshows(url: any): Observable<any> {
    return this.http.get(url);
  }

  gettvshowDetails(tvshow_id: number): Observable<any> {
    return this.http.get(URL_CONSTANTS.GET_TVSHOW_BY_ID(tvshow_id));
  }

  getAllImages(tvshow_id: number): Observable<any> {
    return this.http.get(URL_CONSTANTS.GET_TVSHOW_IMAGES_BY_ID(tvshow_id));
  }
  getAllImagesForEpisodes(
    tvshow_id: number,
    season_id: number,
    episode_id: number
  ): Observable<any> {
    return this.http.get(URL_CONSTANTS.GET_TVSHOW_IMAGES_BY_SEASON_ID(tvshow_id,season_id,episode_id));
  }

  gettvshowReviews(tvshow_id: number): Observable<any> {
    return this.http.get(URL_CONSTANTS.GET_TVSHOW_REVIEWS_BY_ID(tvshow_id));
  }

  getUpcomingTvshows(url: any): Observable<any> {
    return this.http.get(url);
  }
  gettvshowCredits(tvshow_id: number): Observable<any> {
    return this.http.get(URL_CONSTANTS.GET_TVSHOW_CREDITS_BY_ID(tvshow_id));
  }

  getSimilartvshows(tvshow_id: number): Observable<any> {
    return this.http.get(URL_CONSTANTS.GET_TVSHOW_SIMILAR_BY_ID(tvshow_id));
  }

  getRecommendedtvshows(tvshow_id: number): Observable<any> {
    return this.http.get(URL_CONSTANTS.GET_TVSHOW_RECOMMENDED_BY_ID(tvshow_id));
  }

  getVideos(tvshow_id: number): Observable<any> {
    return this.http.get(URL_CONSTANTS.GET_TVSHOW_VIDEOS_BY_ID(tvshow_id));
  }

  getWatchProviders(url: any): Observable<any> {
    return this.http.get(url);
  }

  getEpisodes(url: any): Observable<any> {
    return this.http.get(url);
  }
  getSeason(url: any): Observable<any> {
    return this.http.get(url);
  }
  getSeasonVideos(url: any): Observable<any> {
    return this.http.get(url);
  }

  getEpisodeVideos(url: any): Observable<any> {
    return this.http.get(url);
  }
}
