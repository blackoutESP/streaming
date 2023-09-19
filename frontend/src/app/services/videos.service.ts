import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideosService {

  constructor(private http: HttpClient) { }

  private getVideos(): Observable<object[]> {
    return this.http.get<object[]>('http://0.0.0.0:3000/api/videos', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
