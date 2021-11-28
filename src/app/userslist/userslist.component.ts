import { Component, OnInit } from '@angular/core';
import {User, Review} from "../model";
import {AuthService} from "../auth.service";

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.component.html',
  styleUrls: ['./userslist.component.css']
})
export class UserslistComponent implements OnInit {
  users: User[] = [];
  reviews: Review[] = [];
  selectedUser: User;
  firstClick: boolean = false;
  eUn: boolean = false;
  eEm: boolean = false;
  ePh: boolean = false;
  ePw: boolean = false;
  usersReviews: Review[] = [];

  tiles: Tile[] = [
    {text: 'Under navbar', cols: 4, rows: 1, color: 'lightblue'},
    {text: 'Users list', cols: 1, rows: 25, color: '#4ea7ff'},
    {text: 'User info', cols: 3, rows: 8, color: '#ffffff'},
    {text: 'Package or Rating', cols: 3, rows: 10, color: '#cccccc'},
  ];

  constructor(private WebService : AuthService) { }

  ngOnInit(): void {
    this.users = [];
    this.reviews = [];

    this.loadUsers();
  }

  loadUsers() {
    this.WebService.getUsersList().subscribe((users: any[]) => {
      this.users = users;
    })
  }

  selectUser(user: User) {
    this.eUn = false;
    this.eEm = false;
    this.ePh = false;
    this.ePw = false;
    this.selectedUser = user;
    this.firstClick = true;
  }

  loadReviews() {
    this.WebService.getReviewsList().subscribe((reviews: any[]) => {
      this.reviews = reviews;
    })
  }

  logout(){
    this.WebService.logout();
  }

  editUn(){
    this.eUn = true;
  }
  editEm(){
    this.eEm = true;
  }
  editPh(){
    this.ePh = true;
  }
  editPw(){
    this.ePw = true;
  }
  save(){

  }
}
