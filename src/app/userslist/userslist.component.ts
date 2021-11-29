import { Component, OnInit } from '@angular/core';
import {User, Review, Order, Role} from "../model";
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
  uPackages: Order[] = [];
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
    {text: 'Package or Rating', cols: 3, rows: 26, color: '#cccccc'},
  ];

  constructor(private WebService : AuthService) { }

  ngOnInit(): void {
    this.users = [];
    this.uPackages = [];
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
    if(user.role.toString() === "USER"){
      this.WebService.getPackagesByUser(this.selectedUser.id).subscribe((packages: any[]) => {
        this.uPackages = packages;
      });
    }
    if(user.role.toString() === "TRANSPORTER"){
      this.WebService.getReviewsByTransporter(this.selectedUser.id).subscribe((reviews: any[]) => {
        this.reviews = reviews;
      });
    }
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

  deleteP(p: Order){
    this.WebService.deleteOrder(p);
    this.uPackages.forEach((element,index)=>{
      if(element === p) this.uPackages.splice(index, 1);
    });
  }

  deleteR(r: Review) {
    this.WebService.deleteReview(r);
    this.reviews.forEach((element,index)=>{
      if(element === r) this.reviews.splice(index, 1);
    });
  }
}
