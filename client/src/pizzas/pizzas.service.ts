import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Pizza } from '../shared/classes/pizza';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PizzasService {
  private apiUrl = environment.production == true ? 'https://pizza-shop-manager-e295f45a4e32.herokuapp.com/' : 'http://localhost:8080/';


  constructor(private http: HttpClient) {}

  getPizzas(): Observable<any> {
    return this.http.get(`${this.apiUrl}api/pizzas/getPizzas`, {responseType: 'text'}).pipe(
      map((results) => {
        let parsedResults = JSON.parse(results);
        return parsedResults;
      })
    );
  }

  addNewPizza(pizza: Pizza): Observable<any> {
    let body = {toppings: pizza.toppings, pizzaName: pizza.pizzaName};

    return this.http
      .post(`${this.apiUrl}api/pizzas/addPizza`, body, {
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
      .put(`${this.apiUrl}api/pizzas/updatePizza/${pizza._id}`, pizzaBody, {
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
      .delete(`${this.apiUrl}api/pizzas/deletePizza/${pizza._id}`, { responseType: 'text' })
      .pipe(
        map((result) => {
          return result;
        })
      );
  }
}
