import { Component, ViewChild, ElementRef } from '@angular/core';

import { GetTokenService } from 'src/services/get-token.service';
import { FetchVideosService } from 'src/services/fetch-videos.service';
import { UploadVideoService } from 'src/services/upload-video.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Streaming service';
  token = null;
  videos = [];
  @ViewChild('player', { static: true }) video: ElementRef;
  @ViewChild('source', { static: false }) source: ElementRef;
  @ViewChild('result', { static: false }) result: ElementRef;
  constructor(private fetchVideos: FetchVideosService, private uploadVideo: UploadVideoService,
              private getTokenService: GetTokenService) {
                this.getToken();
                setTimeout(() => {
                  this.getVideos(this.token);
                }, 1000);
  }

  getToken() {
    this.getTokenService.getToken().subscribe(data => {
      this.token = data['data'];
    });
  }

  getVideos(token) {
    this.fetchVideos.getVideos(token).subscribe(data => {
      data['data'].forEach(filename => this.videos.push(filename));
    });
  }

  setUrl(video) {
    // this.source._results[0].nativeElement.src = `http://127.0.0.1:3000/video/${video}`;
    this.source.nativeElement.setAttribute('src', `http://127.0.0.1:3000/api/video/${video}?authorization=Bearer ${this.token}`);
    this.video.nativeElement.load();
    this.video.nativeElement.play();
  }

  handleUpload(event) {
    // console.log(event.target.files[0]);
    return this.uploadVideo.uploadFile(event.target.files[0], this.token).subscribe(data => {
      this.result.nativeElement.innerHTML = data['data'][0].msg;
    });
  }
}
