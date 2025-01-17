import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { sortBy as _sortBy } from 'lodash';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToastModule } from 'primeng/toast';
import { ToppingsService } from '../../../toppings/toppings.service';
import { PizzasService } from '../../pizzas.service';
import { Topping } from '../../../shared/classes/topping';
import { Pizza } from '../../../shared/classes/pizza';

@Component({
  selector: 'app-new-pizza',
  standalone: true,
  imports: [
    CardModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    MultiSelectModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './new-pizza.component.html',
  styleUrl: './new-pizza.component.css',
})
export class NewPizzaComponent implements OnInit {
  @Input() inPizzas: Pizza[] = [];
  @Output() outModalState = new EventEmitter<number>();
  @Output() outModalVisible = new EventEmitter<boolean>();
  @Output() repullPizzas = new EventEmitter<boolean>();

  newPizzaName: string = '';
  availableToppings: Topping[] = [];
  selectedToppings: Topping[] = [];

  constructor(
    private pizzasService: PizzasService,
    private toppingsService: ToppingsService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.toppingsService.getToppings().subscribe({
      next: (results) => {
        console.log(results);
        this.availableToppings = results;
        this.availableToppings = _sortBy(this.availableToppings, [
          'toppingName',
        ]);
      },
      error: (err) => console.log(err),
    });
  }

  addNewPizza(): void {
    let selectedToppingsString = '';
    let selectedToppingsNames = [];
    this.selectedToppings = _sortBy(this.selectedToppings, ['toppingName']);
    for (const t of this.selectedToppings) {
      selectedToppingsNames.push(t.toppingName);
    }
    selectedToppingsString = selectedToppingsNames.join(', ');
    if (
      this.inPizzas.filter(
        (x) =>
          x.pizzaName.toLowerCase() == this.newPizzaName.toLowerCase() ||
          x.toppings.toLowerCase() == selectedToppingsString.toLowerCase()
      ).length == 0
    ) {
      let tempPizza = new Pizza();
      tempPizza.pizzaName = this.newPizzaName;
      tempPizza.toppings = selectedToppingsString;
      this.pizzasService
        .addNewPizza(tempPizza)
        .subscribe({
          next: (results) => {
            this.closeModal(true);
            console.log(results);
          },
          error: (err) => console.log(err),
        });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Not Created',
        detail: 'Pizza Already Exists',
      });
    }
  }

  closeModal(pizzaAdded: boolean): void {
    if (pizzaAdded) {
      this.repullPizzas.emit(true);
    }
    this.outModalState.emit(0);
    this.outModalVisible.emit(false);
  }
}
