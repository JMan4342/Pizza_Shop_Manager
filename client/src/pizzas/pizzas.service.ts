import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Pizza } from '../shared/classes/pizza';

@Injectable({
  providedIn: 'root',
})
export class PizzasService {
  // private apiUrl = 'http://localhost:5200';
  private apiUrl = 'https://pizza-shop-manager-e295f45a4e32.herokuapp.com';
  // private apiUrl = process.env['PORT'] ? 'https://pizza-shop-manager-e295f45a4e32.herokuapp.com' : 'http://localhost:5200';

  constructor(private http: HttpClient) {}

  getPizzas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/pizzas`).pipe(
      map((results) => {
        return results;
      })
    );
  }

  addNewPizza(pizza: Pizza): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/api/pizzas`, pizza, {
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
      .put(`${this.apiUrl}/api/pizzas/${pizza._id}`, pizzaBody, {
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
      .delete(`${this.apiUrl}/api/pizzas/${pizza._id}`, { responseType: 'text' })
      .pipe(
        map((result) => {
          return result;
        })
      );
  }
}
