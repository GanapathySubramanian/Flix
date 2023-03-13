import { environment } from 'src/environments/environment.prod';

export default {
  tmdb: {
    apikey: environment.apiKey,
    movieBaseUrl: 'https://api.themoviedb.org/3',
    tvshowBaseUrl: 'https://api.themoviedb.org/3/discover/tv?',
    tvshowDetailsBaseUrl: 'https://api.themoviedb.org/3/tv/',
    personBaseUrl: 'https://api.themoviedb.org/3/person/',
    imgUrl: 'https://image.tmdb.org/t/p/w500/',
    highQualityImgUrl: 'https://image.tmdb.org/t/p/original',
    videoUrl: 'https://www.youtube.com/embed/',
    thumbnailUrl:'https://img.youtube.com/vi/',
    genreUrl:'https://api.themoviedb.org/3/genre/'
  },
};
