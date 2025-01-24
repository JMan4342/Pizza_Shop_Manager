import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Topping } from '../shared/classes/topping';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ToppingsService {
  private apiUrl = environment.API_URL;
  // private apiUrl = 'http://localhost:5200';
  // private apiUrl = 'https://pizza-shop-manager-e295f45a4e32.herokuapp.com'
  // private apiUrl = process.env['PORT'] ? 'https://pizza-shop-manager-e295f45a4e32.herokuapp.com' : 'http://localhost:5200';

  constructor(private http: HttpClient) { }

  getToppings(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/toppings`).pipe(
      map((results) => {
        return results;
      })
    );
  }

  addNewTopping(toppingName: string): Observable<any> {
    let tempTopping = new Topping();
    tempTopping.toppingName = toppingName;
    
        return this.http
          .post(`${this.apiUrl}/api/toppings`, tempTopping, {
            responseType: 'text',
          })
          .pipe(
            map((result) => {
              return result;
            })
          );
  }

  updateTopping(topping: Topping): Observable<any> {
    let toppingBody = {toppingName: topping.toppingName}
    return this.http
      .put(`${this.apiUrl}/api/toppings/${topping._id}`, toppingBody, {
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
      .delete(`${this.apiUrl}/api/toppings/${topping._id}`, { responseType: 'text' })
      .pipe(
        map((result) => {
          return result;
        })
      );
  }

}
