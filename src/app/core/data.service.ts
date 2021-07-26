import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { ICustomer, IOrder } from '../../app/shared/interfaces';
//import { CustomersComponent } from '../customers/customers.component';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseUrl:string = 'assets/';

  constructor(private http: HttpClient) { }
   getCustomers() : Observable<ICustomer[]>{
     return this.http.get<ICustomer[]>(this.baseUrl + 'customers.json')
     .pipe(catchError(this.handleError));
   }

   getCustomer(id: number) : Observable<ICustomer> {
    return this.http.get<ICustomer[]>(this.baseUrl + 'customers.json')
      .pipe(
        map(customers => {
          let customer = customers.filter((cust: ICustomer) => cust.id === id);
          return (customer && customer.length) ? customer[0] : null as any; //use null as any
        }),
        catchError(this.handleError)
      )
  }
  
  getOrders(id: number) : Observable<IOrder[]> {
    return this.http.get<IOrder[]>(this.baseUrl + 'orders.json')
      .pipe(
        map(orders => {
          let custOrders = orders.filter((order: IOrder) => order.customerId === id);
          return custOrders;
        }),
        catchError(this.handleError)
      );
  }


  private handleError(error: any) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
        const errMessage = error.error.message;
        return Observable.throw(errMessage);
        // Use the following instead if using lite-server
        // return Observable.throw(err.text() || 'backend server error');
    }
    return Observable.throw(error || 'Node.js server error');
  }
}
