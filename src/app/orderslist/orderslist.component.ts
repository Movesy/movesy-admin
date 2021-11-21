import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {Order, Orders} from "../model";

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
  orders : Order[] = [];
  selectedOrder: Order;
  firstClick: boolean = false;

  tiles: Tile[] = [
    {text: 'Under navbar', cols: 4, rows: 1, color: 'lightblue'},
    {text: 'Orders list', cols: 1, rows: 17, color: '#4ea7ff'},
    {text: 'Map with pins', cols: 3, rows: 12, color: '#ab7370'},
    {text: 'Selected orders description', cols: 3, rows: 5, color: '#cccccc'},
  ];

  constructor(private WebService : AuthService) { }

  ngOnInit(): void {
    this.orders = [];
    this.loadOrders();
  }

  loadOrders() {
    this.WebService.getOrdersList().subscribe((orders: any[]) => {
          this.orders = orders;
        })
  }
}
