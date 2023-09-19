import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  public login(): Observable<any[]> {
    return this.http.get<object[]>('http://0.0.0.0:3000/api/login', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
