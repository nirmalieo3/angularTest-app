import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SorterService } from 'src/app/core/sorter.service';
import { ICustomer } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit {
  private _customers:ICustomer[] = [];
  @Input() get customers(): ICustomer[]{
    return this._customers;
  }
  set customers(value: ICustomer[]) {
    if(value){
      this.filteredCustomers = this._customers = value;
      this.calculateOrders();
    }
  }
  filteredCustomers:ICustomer[] = [];
  customersOrderTotal: number = 0;
  currencycode: string = 'USD';
  constructor(private sorterService: SorterService, private route: Router) { }

  ngOnInit(): void {

  }
  calculateOrders() {
    this.customersOrderTotal = 0;
    this.filteredCustomers.forEach((cust: ICustomer) => {
        if(cust.orderTotal){
          this.customersOrderTotal += cust.orderTotal;
        } 
    });
}
filter(data: string) {
  if (data) {
      this.filteredCustomers = this.customers.filter((cust: ICustomer) => {
          if(cust.orderTotal){
            return cust.name.toLowerCase().indexOf(data.toLowerCase()) > -1 ||
                 cust.city.toLowerCase().indexOf(data.toLowerCase()) > -1 ||
                 cust.orderTotal.toString().indexOf(data) > -1;
          } else {
            return cust.name.toLowerCase().indexOf(data.toLowerCase()) > -1 ||
                 cust.city.toLowerCase().indexOf(data.toLowerCase()) > -1;
          }
    
      });
     
  } else {
      this.filteredCustomers = this.customers;
  }
  this.calculateOrders();
}
 sort(prop:string) {
   this.sorterService.sort(this.filteredCustomers,prop)
 }

 public testing(){
   console.log('testing', this.route);
    this.route.navigate(['orders/1']);
 }

}
