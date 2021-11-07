import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from "../auth.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private WebService : AuthService)
  {  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.form.controls; }

  submit(login) {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.WebService.post('authenticate', { username:  this.f.username.value, password: this.f.password.value });
    console.log("Username: " + this.f.username.value + " Password: " + this.f.password.value, login);

  }
}
