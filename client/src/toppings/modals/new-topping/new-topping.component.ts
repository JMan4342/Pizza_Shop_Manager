import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToppingsService } from '../../toppings.service';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Topping } from '../../../shared/classes/topping';

@Component({
  selector: 'app-new-topping',
  standalone: true,
  imports: [
    CardModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './new-topping.component.html',
  styleUrl: './new-topping.component.css',
})
export class NewToppingComponent {
  @Input() inToppings: Topping[] = [];
  @Output() outModalState = new EventEmitter<number>();
  @Output() outModalVisible = new EventEmitter<boolean>();
  @Output() repullToppings = new EventEmitter<boolean>();

  newToppingName: string = '';

  constructor(
    private toppingsService: ToppingsService,
    private messageService: MessageService
  ) {}

  addNewTopping(): void {
    if (
      this.inToppings.filter(
        (x) =>
          x.toppingName.toLocaleLowerCase() ==
          this.newToppingName.toLocaleLowerCase()
      ).length == 0
    ) {
      this.toppingsService.addNewTopping(this.newToppingName).subscribe({
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
        detail: 'Topping Already Exists',
      });
    }
  }

  closeModal(toppingAdded: boolean): void {
    if (toppingAdded) {
      this.repullToppings.emit(true);
    };
    this.outModalState.emit(0);
    this.outModalVisible.emit(false);
  }
}
