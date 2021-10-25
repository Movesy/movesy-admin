import { Component, OnInit } from '@angular/core';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-orderslist',
  templateUrl: './orderslist.component.html',
  styleUrls: ['./orderslist.component.css']
})
export class OrderslistComponent implements OnInit {

  tiles: Tile[] = [
    {text: 'Under navbar', cols: 4, rows: 1, color: 'lightblue'},
    {text: 'Orders list', cols: 1, rows: 17, color: '#4ea7ff'},
    {text: 'Map with pins', cols: 3, rows: 12, color: '#ab7370'},
    {text: 'Selected orders description', cols: 3, rows: 5, color: '#cccccc'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
