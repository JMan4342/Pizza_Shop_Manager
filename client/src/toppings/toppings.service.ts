import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Topping } from '../shared/classes/topping';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ToppingsService {
  // private apiUrl = environment.API_URL;
  // private apiUrl = 'http://localhost:5200';
  // private apiUrl = 'https://pizza-shop-manager-e295f45a4e32.herokuapp.com'
  private apiUrl =
    environment.production == true
      ? 'https://pizza-shop-manager-e295f45a4e32.herokuapp.com'
      : 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getToppings(): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/api/toppings/getToppings`, { responseType: 'text' })
      .pipe(
        map((results) => {
          let parsedResults = JSON.parse(results);
          return parsedResults;
        })
      );
  }

  addNewTopping(toppingName: string): Observable<any> {
    let tempTopping = new Topping();
    tempTopping.toppingName = toppingName;
    // let body = JSON.stringify({ _id: '', toppingName: tempTopping.toppingName });
    let body = tempTopping;
    console.log("body", body);

    return this.http
      .post(`${this.apiUrl}/api/toppings/addTopping`, body, {
        responseType: 'text',
      })
      .pipe(
        map((result) => {
          return result;
        })
      );
  }

  updateTopping(topping: Topping): Observable<any> {
    // let toppingBody = JSON.stringify({ toppingName: topping.toppingName });
    let toppingBody = { toppingName: topping.toppingName };

    return this.http
      .put(`${this.apiUrl}/api/toppings/updateTopping/${topping._id}`, toppingBody, {
        responseType: 'text',
      })
      .pipe(
        map((result) => {
          return result;
        })
      );
  }

  deleteTopping(topping: Topping): Observable<any> {
    return this.http
      .delete(`${this.apiUrl}/api/toppings/deleteTopping/${topping._id}`, {
        responseType: 'text',
      })
      .pipe(
        map((result) => {
          return result;
        })
      );
  }
}
