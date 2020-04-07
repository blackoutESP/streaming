import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadVideoService {

  url = 'http://127.0.0.1:3000/api/upload';
  // httpOptions = {
  //   headers: new HttpHeaders({
  //     Authorization: `Bearer ${this.token}`
  //   })
  // };
  formData: FormData = new FormData();
  constructor(private httpClient: HttpClient) { }

  uploadFile(file: File, token: string) {
    this.formData.append('test', file, file.name);
    return this.httpClient.post<any[]>(this.url + `?authorization=Bearer ${token}`, this.formData);
  }
}
