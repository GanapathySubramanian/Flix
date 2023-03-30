import myAppConfig from '../config/my-app-config';

const BASE_URL = myAppConfig.tmdb.baseUrl;
const TVSHOW_DETAILS_BASE_URL = myAppConfig.tmdb.tvshowDetailsBaseUrl;
const API_KEY = myAppConfig.tmdb.apikey;


export const URL_CONSTANTS = {
    GET_MOVIE_BY_ID: (id: number) => `${BASE_URL}movie/${id}?${API_KEY}`,
    GET_COLLECTION_BY_ID: (id: number) => `${BASE_URL}collection/${id}?${API_KEY}`,
    GET_MOVIE_IMAGES_BY_ID: (id: number) => `${BASE_URL}movie/${id}/images?${API_KEY}`,
    GET_MOVIE_VIDEOS_BY_ID: (id: number) => `${BASE_URL}movie/${id}/videos?${API_KEY}`,
    GET_MOVIE_REVIEWS_BY_ID: (id: number) => `${BASE_URL}movie/${id}/reviews?${API_KEY}`,
    GET_MOVIE_CREDITS_BY_ID: (id: number) => `${BASE_URL}movie/${id}/credits?${API_KEY}`,
    GET_MOVIE_SIMILAR_BY_ID: (id: number) => `${BASE_URL}movie/${id}/similar?${API_KEY}`,
    GET_MOVIE_RECOMMENDED_BY_ID: (id: number) => `${BASE_URL}movie/${id}/recommendations?${API_KEY}`,
    GET_MOVIE_WATCH_PROVIDER_BY_ID: (id: number) => `${BASE_URL}movie/${id}/watch/providers?${API_KEY}`,
    GET_TRENDING_ALL_DAY:`${BASE_URL}trending/all/day?${API_KEY}`,
    GET_TRENDING_MOVIE_DAY:`${BASE_URL}trending/movie/day?${API_KEY}`,
    GET_TRENDING_TVSHOW_DAY:`${BASE_URL}trending/tv/day?${API_KEY}`,
    GET_TRENDING_PERSON_DAY:`${BASE_URL}trending/person/day?${API_KEY}`,
    GET_TRENDING_ALL_WEEK:`${BASE_URL}trending/all/week?${API_KEY}`,
    GET_TRENDING_MOVIE_WEEK:`${BASE_URL}trending/movie/week?${API_KEY}`,
    GET_TRENDING_TVSHOW_WEEK:`${BASE_URL}trending/tv/week?${API_KEY}`,
    GET_TRENDING_PERSON_WEEK:`${BASE_URL}trending/person/week?${API_KEY}`,
    GET_TVSHOW_BY_ID: (id: number) => `${TVSHOW_DETAILS_BASE_URL}${id}?${API_KEY}`,
    GET_TVSHOW_IMAGES_BY_ID: (id: number) => `${TVSHOW_DETAILS_BASE_URL}${id}/images?${API_KEY}`,
    GET_TVSHOW_VIDEOS_BY_ID: (id: number) => `${TVSHOW_DETAILS_BASE_URL}${id}/videos?${API_KEY}`,
    GET_TVSHOW_IMAGES_BY_SEASON_ID: (tvshowId: number,seasonId:number,episodeId:number) => `${TVSHOW_DETAILS_BASE_URL}${tvshowId}/season/${seasonId}/episode/${episodeId}/images?${API_KEY}`,
    GET_TVSHOW_REVIEWS_BY_ID: (id: number) => `${TVSHOW_DETAILS_BASE_URL}${id}/reviews?${API_KEY}`,
    GET_TVSHOW_CREDITS_BY_ID: (id: number) => `${TVSHOW_DETAILS_BASE_URL}/${id}/credits?${API_KEY}`,
    GET_TVSHOW_SIMILAR_BY_ID: (id: number) => `${TVSHOW_DETAILS_BASE_URL}/${id}/similar?${API_KEY}`,
    GET_TVSHOW_RECOMMENDED_BY_ID: (id: number) => `${TVSHOW_DETAILS_BASE_URL}/${id}/recommendations?${API_KEY}`,

};
