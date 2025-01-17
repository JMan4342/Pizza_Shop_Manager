import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Pizza } from '../shared/classes/pizza';

@Injectable({
  providedIn: 'root',
})
export class PizzasService {
  private apiUrl = 'http://localhost:5200';

  constructor(private http: HttpClient) {}

  getPizzas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/pizzas`).pipe(
      map((results) => {
        return results;
      })
    );
  }

  addNewPizza(pizza: Pizza): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/pizzas`, pizza, {
        responseType: 'text',
      })
      .pipe(
        map((result) => {
          return result;
        })
      );
  }

  updatePizza(pizza: Pizza): Observable<any> {
    let pizzaBody = {toppings: pizza.toppings, pizzaName: pizza.pizzaName};
    return this.http
      .put(`${this.apiUrl}/pizzas/${pizza._id}`, pizzaBody, {
        responseType: 'text',
      })
      .pipe(
        map((result) => {
          return result;
        })
      );
  }

  deletePizza(pizza: Pizza): Observable<any> {
    return this.http
      .delete(`${this.apiUrl}/pizzas/${pizza._id}`, { responseType: 'text' })
      .pipe(
        map((result) => {
          return result;
        })
      );
  }
}
