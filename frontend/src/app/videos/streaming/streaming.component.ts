import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, Sanitizer, SecurityContext } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { VideoService } from 'src/app/services/video.service';
import packageJSON from '../../../../package.json';

@Component({
  selector: 'streaming',
  templateUrl: './streaming.component.html',
  styleUrls: ['./streaming.component.scss']
})
export class StreamingComponent {

  public overlay: any;
  public loading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public title = 'Small Streaming Service';
  public version: string = packageJSON.version;
  public src: string = '';
  public song: string = '';
  public videos: string[] = [];
  public type: string = '';
  private token: string = '';
  public mobile: boolean = false;

  constructor(
    private overlayContainer: OverlayContainer,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private videoService: VideoService,
    private sanitizer: Sanitizer
  ) {

  }

  ngOnInit(): void {
    this.feedVideoList();
  }

  public feedVideoList(): void {
    this.loading.next(true);
    this.videoService.getVideos().pipe().subscribe((response: any) => {
      response['data'].forEach((item: string) => this.videos.push(item));
      if (this.videos.length > 0) {
        this.loading.next(false);
      }
    });
  }

  public getVideoById(id: string): any {
    this.song = id;
    if (id) {
      // this.url = this.sanitizer.sanitize(4, encodeURI(`http://0.0.0.0:3000/api/videos/${id}?authorization=Bearer ${this.token}`)) || '';
      this.src = encodeURI(`http://0.0.0.0:3000/api/videos/${id}?authorization=Bearer ${this.token}`);
      // this.router.navigate(
      //   [],
      //   {
      //     relativeTo: this.activatedRoute,
      //     queryParams: { query: encodeURI(`/videos/${id}?authorization=Bearer ${this.token}`) },
      //     queryParamsHandling: 'preserve'
      //   });
    }
  }
}
