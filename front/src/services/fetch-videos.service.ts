import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FetchVideosService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  url = 'http://127.0.0.1:3000/api/videos';
  videos: Array<object> = [];
  constructor(private http: HttpClient) { }

  getVideos(token) {
    return this.http.get<any[]>(this.url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    });
  }
}
