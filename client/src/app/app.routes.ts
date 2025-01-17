import { Routes } from '@angular/router';
import { PizzasComponent } from '../pizzas/pizzas.component';
import { ToppingsComponent } from '../toppings/toppings.component';

export const routes: Routes = [
  { path: 'pizzas', component: PizzasComponent },
  { path: 'toppings', component: ToppingsComponent },
  { path: '', component: PizzasComponent },
  { path: '**', component: PizzasComponent },
];
