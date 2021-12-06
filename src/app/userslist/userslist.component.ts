import { Component, OnInit } from '@angular/core';
import {User, Review, Package, Role, Location, Size, Status} from "../model";
import {AuthService} from "../auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {formatDate} from "@angular/common";
import {Router} from "@angular/router";

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
  packageForm: FormGroup;
  formun: FormGroup;
  formem: FormGroup;
  formph: FormGroup;
  formpw: FormGroup;
  users: User[] = [];
  uPackages: Package[] = [];
  reviews: Review[] = [];
  selectedUser: User;
  firstClick: boolean = false;
  eUn: boolean = false;
  eEm: boolean = false;
  ePh: boolean = false;
  ePw: boolean = false;

  tiles: Tile[] = [
    {text: 'Under navbar', cols: 4, rows: 1, color: 'lightblue'},
    {text: 'Users list', cols: 1, rows: 18, color: '#4ea7ff'},
    {text: 'User info', cols: 3, rows: 8, color: '#ffffff'},
    {text: 'Package or Rating', cols: 3, rows: 20, color: '#cccccc'},
  ];

  constructor(private WebService : AuthService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('id_token') === null){
      this.router.navigateByUrl('');
      return;
    }
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
      this.packageForm = this.formBuilder.group({
          packages: this.formBuilder.array([
            this.formBuilder.group({
              trans: [null],
              cost: [null],
              stat: [null],
              size: [null],
              wei: [null, Validators.min(0)],
              dl: [formatDate(null, 'fullDate', 'en')],
              from: [null, Validators.minLength(3)],
              to: [null, Validators.minLength(3)],
              price: [null, Validators.min(0)]
            })
          ])
      })
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
    this.formun = this.formBuilder.group({
      inputUn: [this.selectedUser.username, Validators.required]
    })
  }

  get formUnValues() { return this.formun.controls; }

  editEm(){
    this.eEm = true;
    this.formem = this.formBuilder.group({
      inputEm: [this.selectedUser.email, Validators.email]
    })
  }

  get formEmValues() { return this.formem.controls; }

  editPh(){
    this.ePh = true;
    this.formph = this.formBuilder.group({
      inputPh: [this.selectedUser.telephone]
    })
  }

  get formPhValues() { return this.formph.controls; }

  editPw(){
    this.ePw = true;
    this.formpw = this.formBuilder.group({
      inputPw: [null, Validators.required]
    })
  }

  get formPwValues() { return this.formpw.controls; }

  deleteP(p: Package){
    this.WebService.deleteOrder(p).subscribe();
    this.uPackages.forEach((element,index)=>{
      if(element === p) this.uPackages.splice(index, 1);
    });
  }

  deleteR(r: Review) {
    this.WebService.deleteReview(r).subscribe();
    this.reviews.forEach((element,index)=>{
      if(element === r) this.reviews.splice(index, 1);
    });
  }

  saveOrder() {
    if (this.packageForm.invalid) {
      return;
    }
    let p: Package;
    p = new Package();

    //Valahogy el kéne érni a for által generált formokat.

    this.WebService.savePackage(p).subscribe((j: any[]) => {
      this.uPackages.forEach((element,index)=>{
        if(element.id === p.id){
          this.uPackages.splice(index, 1, p)
        }
      });
    });
  }

  saveUn() {
    if (this.formun.invalid) {
      return;
    }
    let u = this.selectedUser
    u.username = this.formUnValues.inputUn.value
    this.saveUser(u)
    this.eUn = false;
  }

  saveEm() {
    if (this.formem.invalid) {
      return;
    }
    let u = this.selectedUser
    u.email = this.formEmValues.inputEm.value
    this.saveUser(u)
    this.eEm = false;
  }

  savePh() {
    if (this.formph.invalid) {
      return;
    }
    let u = this.selectedUser
    u.telephone = this.formPhValues.inputPh.value
    this.saveUser(u)
    this.ePh = false;
  }

  savePw() {
    if (this.formpw.invalid) {
      return;
    }
    let u = this.selectedUser
    u.password = this.formPwValues.inputPw.value
    this.saveUser(u)
    this.ePw = false;
  }

  saveUser(u: User){
    this.WebService.saveUser(u).subscribe((j: any[]) => {
      this.users.forEach((element,index)=>{
        if(element.id === u.id){
          this.users.splice(index, 1, u)
          this.selectedUser = this.users[index]
        }
      });
    });
  }
}
