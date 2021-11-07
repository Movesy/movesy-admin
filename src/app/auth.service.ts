import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  readonly ROOT_URL;

  constructor(private http: HttpClient) {
    this.ROOT_URL = "https://movesy.herokuapp.com";
  }

  get(uri: string){
    return this.http.get('$(this.ROOT_URL)/$(uri)');
  }

  post(uri: string, details: Object){
    return this.http.post('$(this.ROOT_URL)/$(uri)', details);
  }

  put(uri: string, details: Object){
    return this.http.put('$(this.ROOT_URL)/$(uri)', details);
  }

  delete(uri: string){
    return this.http.delete('$(this.ROOT_URL)/$(uri)');
  }
}
