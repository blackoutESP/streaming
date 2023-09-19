import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/app/env/environment';

@Injectable({
  providedIn: 'root'
})
export class GetTokenService {

  private loginUrl: string = environment.loginUrl;
  constructor(private httpClient: HttpClient) { }

  getAuthToken = () => {
    const token = '';
    const params = new HttpHeaders().set('Content-Type','application/json')
                                   .set('Authorization', token);
    return this.httpClient.get<object>(this.loginUrl + {headers: params});
  };
 };


