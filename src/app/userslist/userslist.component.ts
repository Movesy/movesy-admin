import { Component, OnInit } from '@angular/core';

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

  tiles: Tile[] = [
    {text: 'Under navbar', cols: 4, rows: 1, color: 'lightblue'},
    {text: 'Users list', cols: 1, rows: 17, color: '#4ea7ff'},
    {text: 'User info', cols: 3, rows: 8, color: '#c7c6a5'},
    {text: 'Package or Rating', cols: 3, rows: 9, color: '#cccccc'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
