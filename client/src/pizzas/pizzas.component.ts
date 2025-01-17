import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PizzasService } from './pizzas.service';
import { Pizza } from '../shared/classes/pizza';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { NewPizzaComponent } from './modals/new-pizza/new-pizza.component';
import { EditPizzaComponent } from './modals/edit-pizza/edit-pizza.component';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-pizzas',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    TableModule,
    FormsModule,
    ButtonModule,
    DialogModule,
    NewPizzaComponent,
    EditPizzaComponent,
    TooltipModule ],
  templateUrl: './pizzas.component.html',
  styleUrl: './pizzas.component.css'
})
export class PizzasComponent implements OnInit {
  pizzas: Pizza[] = [];
  editPizza: Pizza = new Pizza();
  modalVisible: boolean = false;
  modalShown: number = 0;

  constructor(    
    private pizzasService: PizzasService
  ) {}

  ngOnInit(): void {
    this.getPizzas(true);
  }

  getPizzas(pullPizzas: boolean): void {
    if (pullPizzas){
      this.pizzasService.getPizzas().subscribe({
        next: results => {
          this.pizzas = results;
        },
        error: err => console.log(err),
      });
    };
  }

  addPizzaModal(): void {
    this.modalShown = 1;
    this.modalVisible = true;
  }

  editPizzaModal(pizza: Pizza): void {
    this.editPizza = new Pizza();
    this.editPizza = pizza;
    this.modalShown = 2;
    this.modalVisible = true;
  }

  deletePizza(pizza: Pizza): void {
    this.pizzasService.deletePizza(pizza).subscribe({
      next: result => {
        this.getPizzas(true);
      },
      error: err => console.log(err),
    });
  }
}
