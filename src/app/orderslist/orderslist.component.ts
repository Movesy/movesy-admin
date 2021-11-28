import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {Order} from "../model";

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
  size: number;

  tiles: Tile[] = [
    {text: 'Under navbar', cols: 4, rows: 1, color: 'lightblue'},
    {text: 'Orders list', cols: 1, rows: 38, color: '#4ea7ff'},
    {text: 'Map with pins', cols: 3, rows: 12, color: '#ab7370'},
    {text: 'Selected orders description', cols: 3, rows: 6, color: '#cccccc'},
  ];

  constructor(private WebService : AuthService) { }

  ngOnInit(): void {
    this.orders = [];
    this.loadOrders();
    this.size = this.orders.length * (38/33);
  }

  loadOrders() {
    this.WebService.getOrdersList().subscribe((orders: any[]) => {
          this.orders = orders;
        })
  }

  selectOrder(order: Order) {
    this.selectedOrder = order;
    this.firstClick = true;
  }

  logout(){
    this.WebService.logout();
  }
}
