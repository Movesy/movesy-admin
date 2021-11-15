import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

export interface Order {
  ID: string;
  size: string;
  weight: string;
  prize: string;
  deadline: string;
  from: string;
  to: string;
  customer: string;
  transporter: string;
}

@Component({
  selector: 'app-orderslist',
  templateUrl: './orderslist.component.html',
  styleUrls: ['./orderslist.component.css']
})
export class OrderslistComponent implements OnInit {

  lat = 51.678418;
  lng = 7.809007;

  tiles: Tile[] = [
    {text: 'Under navbar', cols: 4, rows: 1, color: 'lightblue'},
    {text: 'Orders list', cols: 1, rows: 17, color: '#4ea7ff'},
    {text: 'Map with pins', cols: 3, rows: 12, color: '#ab7370'},
    {text: 'Selected orders description', cols: 3, rows: 5, color: '#cccccc'},
  ];

  constructor(private WebService : AuthService) { }

  ngOnInit(): void {
    var orders = this.WebService.getOrdersList();
  }

}
