import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {Location, Package, Size, Status} from "../model";
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
  selector: 'app-orderslist',
  templateUrl: './orderslist.component.html',
  styleUrls: ['./orderslist.component.css']
})
export class OrderslistComponent implements OnInit {
  form: FormGroup;
  orders : Package[] = [];
  selectedOrder: Package;
  firstClick: boolean = false;
  size: number;

  tiles: Tile[] = [
    {text: 'Under navbar', cols: 4, rows: 1, color: 'lightblue'},
    {text: 'Orders list', cols: 1, rows: 18, color: '#4ea7ff'},
    {text: 'Map with pins', cols: 3, rows: 12, color: '#ab7370'},
    {text: 'Selected orders description', cols: 3, rows: 6, color: '#cccccc'},
  ];

  constructor(private WebService : AuthService, private formBuilder: FormBuilder, private router : Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('id_token') === null){
      this.router.navigateByUrl('');
      return;
    }
    this.orders = [];
    this.loadOrders();
    this.size = this.orders.length * (38/33);
  }

  loadOrders() {
    this.WebService.getOrdersList().subscribe((orders: any[]) => {
          this.orders = orders;
        })
  }

  selectOrder(order: Package) {
    this.selectedOrder = order;
    this.firstClick = true;
    this.form = this.formBuilder.group({
      trans: [order.transporterID],
      cost: [order.userID],
      stat: [order.status],
      size: [order.size],
      wei: [order.weight, Validators.min(0)],
      dl: [formatDate(order.deadline, 'fullDate', 'en')],
      from: [order.from.address, Validators.minLength(3)],
      to: [order.to.address, Validators.minLength(3)],
      price: [order.price, Validators.min(0)]
    });
  }

  logout(){
    this.WebService.logout();
  }

  deleteOrder(){
    this.WebService.deleteOrder(this.selectedOrder).subscribe();
    this.orders.forEach((element,index)=>{
      if(element === this.selectedOrder) this.orders.splice(index, 1);
    });
  }

  get formValues() { return this.form.controls; }

  saveOrder() {
    if (this.form.invalid) {
      return;
    }
    let p: Package;
    p = new Package();
    p.id = this.selectedOrder.id;
    p.name = this.selectedOrder.name;
    p.userID = this.formValues.cost.value;
    p.transporterID = this.formValues.trans.value;
    let fr = new Location()
    fr.longitude = this.selectedOrder.from.longitude
    fr.latitude = this.selectedOrder.from.latitude
    fr.address = this.formValues.from.value
    p.from = fr;
    let to = new Location()
    to.longitude = this.selectedOrder.to.longitude
    to.latitude = this.selectedOrder.to.latitude
    to.address = this.formValues.to.value
    p.to = to;
    p.creationDate = this.selectedOrder.creationDate;
    p.deadline = new Date(this.formValues.dl.value);
    p.price = this.formValues.price.value as number;
    p.weight = this.formValues.wei.value as number;
    p.size = this.formValues.size.value as Size;
    p.status = this.formValues.stat.value as Status;



    this.WebService.savePackage(p).subscribe((j: any[]) => {
      this.orders.forEach((element,index)=>{
        if(element.id === p.id){
          this.orders.splice(index, 1, p)
          this.selectedOrder = this.orders[index]
        }
      });
    });
  }
}
