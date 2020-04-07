import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetTokenService {

  url: string = 'http://127.0.0.1:3000/api/login';
  constructor(private httpClient: HttpClient) { }

  getToken() {
    return this.httpClient.get<object[]>(this.url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
