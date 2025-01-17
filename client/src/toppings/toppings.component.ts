import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { sortBy as _sortBy } from 'lodash-es';
import { ToppingsService } from './toppings.service';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { Topping } from '../shared/classes/topping';
import { EditToppingComponent } from './modals/edit-topping/edit-topping.component';
import { NewToppingComponent } from './modals/new-topping/new-topping.component';

@Component({
  selector: 'app-toppings',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    TableModule,
    FormsModule,
    ButtonModule,
    DialogModule,
    TooltipModule,
    EditToppingComponent,
    NewToppingComponent,
  ],
  templateUrl: './toppings.component.html',
  styleUrl: './toppings.component.css',
})
export class ToppingsComponent implements OnInit {
  toppings: Topping[] = [];
  editTopping: Topping = new Topping();
  modalVisible: boolean = false;
  modalShown: number = 0;

  constructor(private toppingsService: ToppingsService) {}

  ngOnInit(): void {
    this.getToppings(true);
  }

  getToppings(pullToppings: boolean): void {
    if (pullToppings) {
      this.toppingsService.getToppings().subscribe({
        next: (results) => {
          this.toppings = results;
          this.toppings = _sortBy(this.toppings, ['toppingName']);
        },
        error: (err) => console.log(err),
      });
    }
  }

  addToppingModal(): void {
    this.modalShown = 1;
    this.modalVisible = true;
  }

  editToppingModal(topping: Topping): void {
    this.editTopping = new Topping();
    this.editTopping = topping;
    this.modalShown = 2;
    this.modalVisible = true;
  }

  deleteTopping(topping: Topping): void {
    this.toppingsService.deleteTopping(topping).subscribe({
      next: result => {
        this.getToppings(true);
      },
      error: err => console.log(err),
    });
  }
}
