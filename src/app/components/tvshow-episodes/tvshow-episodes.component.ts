import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import myAppConfig from 'src/app/core/config/my-app-config';
import { TvshowsService } from 'src/app/core/services/tvshows.service';

var tvshow_id=0,season_id=0,tv_name='';
@Component({
  selector: 'app-tvshow-episodes',
  templateUrl: './tvshow-episodes.component.html',
  styleUrls: ['./tvshow-episodes.component.css']
})
export class TvshowEpisodesComponent implements OnInit {
  
  imgUrl:any=myAppConfig.tmdb.highQualityImgUrl;

  episodes:any=[];
  tvshow_name:String='';
  season_no:number=0;
  logos:any=[];

  noLogos:boolean=false;
  constructor(private route:ActivatedRoute,private tvshowservice:TvshowsService) {

    let id = this.route.snapshot.params['tvshowid'];
    let sea_id = this.route.snapshot.params['season'];
    let show_name = this.route.snapshot.params['tvshow_name'];
    tvshow_id=id;
    season_id=sea_id;
    tv_name=show_name;
    this.tvshow_name=tv_name;
    this.season_no=season_id;

  }

  ngOnInit(): void {
    this.getEpisodes();
  }

  getEpisodes() {
    let api_url=myAppConfig.tmdb.tvshowDetailsBaseUrl+tvshow_id+'/season/'+season_id+'?'+myAppConfig.tmdb.apikey;
    this.getEpisodesData(api_url)

    let logo_url=myAppConfig.tmdb.tvshowDetailsBaseUrl+tvshow_id+'/images?'+myAppConfig.tmdb.apikey;
    this.getAllimages(logo_url);
  }
  getAllimages(logo_url: string) {
    this.tvshowservice.getAllImages(logo_url);

    let tempimagesData:any;
    this.tvshowservice.tvshowallImageData.subscribe((data)=>{
      tempimagesData=data;


      //Tvshow Logo Images
      if(tempimagesData.logos.length<=0){
        this.noLogos=true;
      }else{
        this.noLogos=false;
        this.logos=tempimagesData.logos[0];
      }
      
      
    })
  }
  getEpisodesData(api_url: string) {
      this.tvshowservice.getEpisodes(api_url);

      let epi:any;
      this.tvshowservice.episodeData.subscribe((data)=>{
        epi=data;        
        this.episodes=epi;
      })
  }

  float2int (value:any) {
    return value | 0;
  }
}
