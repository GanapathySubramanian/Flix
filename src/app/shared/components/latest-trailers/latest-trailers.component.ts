import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MoviesService } from 'src/app/core/services/movies.service';
import myAppConfig from 'src/app/core/config/my-app-config';

@Component({
  selector: 'app-latest-trailers',
  templateUrl: './latest-trailers.component.html',
  styleUrls: ['./latest-trailers.component.css']
})
export class LatestTrailersComponent implements OnInit {
  selectedTrailer: any = null;
  openPopUp: boolean = false;
  categories = [
    { id: 'trending', name: 'Trending' },
    { id: 'topRated', name: 'Top Rated' },
    { id: 'upcoming', name: 'Upcoming' },
    { id: 'nowPlaying', name: 'In Theaters' },
    { id: 'popular', name: 'Popular' }
  ];
  
  activeCategory: string = 'trending';
  trailers: any[] = [];
  loading: boolean = true;
  error: string | null = null;
  
  constructor(
    private moviesService: MoviesService,
    private _sanitizer: DomSanitizer
  ) {}
  
  ngOnInit(): void {
    this.loadTrailers(this.activeCategory);
  }
  
  changeCategory(category: string): void {
    this.activeCategory = category;
    this.loading = true;
    this.error = null;
    this.loadTrailers(category);
  }
  
  loadTrailers(category: string): void {
    this.moviesService.getTrailersByCategory(category)
      .subscribe({
        next: (data: any) => {
          // Process the trailer data to match the format expected by the video component
          this.trailers = this.processTrailerData(data);
          this.loading = false;
        },
        error: (err: any) => {
          console.error('Error fetching trailer data:', err);
          this.error = 'Failed to load trailer data. Please try again later.';
          this.loading = false;
        }
      });
  }
  
  processTrailerData(data: any): any[] {
    if (!data || !data.results) {
      return [];
    }
    
    const processedTrailers = data.results.map((movie: any) => {
      if (!movie.trailer) {
        return null;
      }
      
      // Store the original key before sanitizing
      const originalKey = movie.trailer.key;
      
      const trailer: any = {
        id: movie.id,
        title: movie.title || movie.name,
        // Use trailer properties
        type: movie.trailer.type,
        site: movie.trailer.site,
        name: movie.trailer.name || movie.title,
        published_at: movie.trailer.published_at,
        // Add thumbnail using YouTube thumbnail URL format
        videoThumbnail: movie.backdrop_path ? 
          myAppConfig.tmdb.highQualityImgUrl + movie.backdrop_path : 
          myAppConfig.tmdb.thumbnailUrl + originalKey + '/0.jpg'
      };
      
      // Sanitize video URL and store it in the key property
      trailer.key = this._sanitizer.bypassSecurityTrustResourceUrl(
        myAppConfig.tmdb.videoUrl + originalKey + '?autoplay=1'
      );
      
      return trailer;
    }).filter(Boolean); // Remove null values
    
    return processedTrailers;
  }
  
  openTrailer(trailer: any): void {
    // Format the data to match how pop-up-modal expects it
    this.selectedTrailer = {
      key: trailer.key,
      type: trailer.type,
      site: trailer.site,
      name: trailer.name
    };
    this.openPopUp = true;
  }
  
  resetData(event: boolean): void {
    this.selectedTrailer = null;
    this.openPopUp = !event;
  }
}
