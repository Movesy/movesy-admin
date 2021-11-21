import { Component, OnInit } from '@angular/core';
import {User, Review} from "../Model";
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
  usersReviews: Review[] = [];

  tiles: Tile[] = [
    {text: 'Under navbar', cols: 4, rows: 1, color: 'lightblue'},
    {text: 'Users list', cols: 1, rows: 17, color: '#4ea7ff'},
    {text: 'User info', cols: 3, rows: 8, color: '#ffffff'},
    {text: 'Package or Rating', cols: 3, rows: 9, color: '#cccccc'},
  ];

  constructor(private WebService : AuthService) { }

  ngOnInit(): void {
    this.users = [];
    this.reviews = [];

    this.loadUsers();
    this.loadReviews();
  }

  loadUsers() {
    this.WebService.getUsersList().subscribe((users: any[]) => {
      this.users = users;
    })
  }

  loadReviews() {
    this.WebService.getReviewsList().subscribe((reviews: any[]) => {
      this.reviews = reviews;
    })
  }
}
