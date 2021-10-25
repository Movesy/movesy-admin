import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) { }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getUserDetails(){
    //post these details to API return user info if correct
  }
}
