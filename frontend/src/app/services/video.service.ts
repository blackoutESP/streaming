import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Sanitizer, SecurityContext } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(
    private http: HttpClient,
    private sanitizer: Sanitizer
  ) {

  }

  public getVideos(): Observable<any[]> {
    return this.http.get<object[]>('http://0.0.0.0:3000/api/videos', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  public getVideoById(id: string, token: string): Observable<any> {
    return this.http.get<object[]>(`http://0.0.0.0:3000/api/videos/${id}?authorization=Bearer ${token}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
