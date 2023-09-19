import { getVideoById } from './../../../../back/middlewares/video';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Themes } from '../interfaces/theme-selected.enum';
import { environment } from '../env/environment';
import { GetTokenService } from '../services/get-token.service';

import { map, pipe } from 'rxjs';
import { GetVideosService } from '../services/get-videos.service';
// import { FetchVideosService } from 'src/services/fetch-videos.service';
// import { UploadVideoService } from 'src/services/upload-video.service';

@Component({
  selector: 'videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit, OnDestroy {
  public title = 'Small Streaming Service';
  public themeSelected: string = Themes.DarkTheme;
  private user: object = {};
  private handlerInfo: object = {
    ok: Boolean,
    data: [],
    errors: []
  };
  private $handler: BehaviorSubject<any>;
  private $destroyed: BehaviorSubject<boolean>;
  private tokenUrl: string = '';
  private GetTokenService: any;
  private videosUrl = environment.videosUrl;
  private videoById: string = environment.videoById;
  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient,
    private getTokenService: GetTokenService,
    private getVideosService: GetVideosService) {
    this.$handler  = new BehaviorSubject(this.handlerInfo);
    this.$destroyed = new BehaviorSubject(false);
    this.GetTokenService

  }

  ngOnInit(): void {
    this.handleLogin();

    // this.activatedRoute.queryParams.subscribe(data => console.log(data));
  }

  ngOnDestroy(): void {

  }

  handleLogin(): any {
    fetch(`http://0.0.0.0:3000/api/login`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(res => res.json())
    .then(response => {
      console.log(response);
      // decodeURI('videos/Evanescence - Better Without You (Official Music Video).webm')
    });
  }

  handleUpload(event: any): void {

  }

  getVideos(): void {
    const authToken = this.GetTokenService().getAuthToken();
    console.log(authToken);
  }

  setUrl(videoUrl: string): void {
    const source = document.querySelector('#source');
    source?.classList.add('src', this.getVideosService.getVideoById('DICEN QUE SOY EL DIABLO (OFFICIAL MUSIC VIDEO).webm'));
    const video = document.querySelector('video');
    video?.autoplay;
    video?.autofocus;
  }

  onThemeSwitch(event: any): void {

  }
}
