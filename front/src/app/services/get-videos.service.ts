import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/app/env/environment';
import { GetTokenService } from './get-token.service';

@Injectable({
  providedIn: 'root'
})
export class GetVideosService {

  private videosUrl: string = environment.videosUrl;
  private videoById: string = environment.videoById;
  constructor(private httpClient: HttpClient, private getTokenService: GetTokenService) { }

  getVideos(): any {
    const params = new HttpHeaders().set('Content-Type','application/json').set('Authorization', `Bearer ${this.getTokenService.getAuthToken()}`)
    const token = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${params}`);
    return this.httpClient.get<object[]>(this.videosUrl, {headers: params});
  }

  getVideoById(id: string): any {
    const params = new HttpHeaders().set('Content-Type','application/json').set('Authorization', `Bearer ${this.getTokenService.getAuthToken()}`)
    const token = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${params}`);
    return this.httpClient.get<object[]>(`${this.videoById}/${id}`, {headers: params});
  }
 };
