import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import myAppConfig from 'src/app/core/config/my-app-config';
import { MoviesService } from 'src/app/core/services/movies.service';
var collection_Id = 0;
@Component({
  selector: 'app-collection-details',
  templateUrl: './collection-details.component.html',
  styleUrls: ['./collection-details.component.css'],
})
export class CollectionDetailsComponent implements OnInit {
  collectionDetails: any = {} as any;
  highQualityImgUrl: string = myAppConfig.tmdb.highQualityImgUrl;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieservice: MoviesService,
    private _sanitizer: DomSanitizer
  ) {
    let id = this.route.snapshot?.params['id'];
    collection_Id = id;
  }
  ngOnInit(): void {
    this.getCollectionDetails(collection_Id);
  }
  getCollectionDetails(id: number) {
    var api_url =
      myAppConfig.tmdb.movieBaseUrl +
      '/collection/' +
      id +
      '?' +
      myAppConfig.tmdb.apikey;

    this.getCollectionData(api_url);
  }
  getCollectionData(api_url: string) {
    this.movieservice.getMovieDetails(api_url);
    this.movieservice.moviedetailsData.subscribe((data) => {
      this.collectionDetails = data;
      console.log(data);
      this.collectionDetails.background_image =
        this.highQualityImgUrl + this.collectionDetails.backdrop_path;
      this.collectionDetails.no_animation = true;
    });
  }
}
