import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Topping } from '../shared/classes/topping';

@Injectable({
  providedIn: 'root'
})
export class ToppingsService {

  private apiUrl = 'http://localhost:5200';

  constructor(private http: HttpClient) { }

  getToppings(): Observable<any> {
    return this.http.get(`/toppings`).pipe(
      map((results) => {
        return results;
      })
    );
  }

  addNewTopping(toppingName: string): Observable<any> {
    let tempTopping = new Topping();
    tempTopping.toppingName = toppingName;
    
        return this.http
          .post(`/toppings`, tempTopping, {
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
      .put(`/toppings/${topping._id}`, toppingBody, {
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
      .delete(`/toppings/${topping._id}`, { responseType: 'text' })
      .pipe(
        map((result) => {
          return result;
        })
      );
  }

}
