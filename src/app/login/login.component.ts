import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(httpClient: HttpClient) {

  }

  ngOnInit(): void {

  }

  submit(login: NgForm) {
    console.log("Form submitted");

  }
}
