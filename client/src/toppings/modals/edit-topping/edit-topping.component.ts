import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToppingsService } from '../../toppings.service';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { Topping } from '../../../shared/classes/topping';
import { cloneDeep as _cloneDeep } from 'lodash';

@Component({
  selector: 'app-edit-topping',
  standalone: true,
  imports: [
    CardModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './edit-topping.component.html',
  styleUrl: './edit-topping.component.css',
})
export class EditToppingComponent implements OnInit {
  @Input() inToppings: Topping[] = [];
  @Input() inToppingDetail: Topping = new Topping();
  @Output() outModalState = new EventEmitter<number>();
  @Output() outModalVisible = new EventEmitter<boolean>();
  @Output() repullToppings = new EventEmitter<boolean>();

  topping: Topping = new Topping();
  currentToppings: Topping[] = [];
  remainToppings: Topping[] = [];

  constructor(
    private toppingsService: ToppingsService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.topping = new Topping();
    this.topping = _cloneDeep(this.inToppingDetail);

    this.currentToppings = [];
    this.currentToppings = _cloneDeep(this.inToppings);
    this.remainToppings = this.currentToppings.filter(x => x._id != this.topping._id);
  }

  updateTopping(): void {
    if (
      this.remainToppings.filter(
        (x) => x.toppingName.toLowerCase() == this.topping.toppingName.toLowerCase()
      ).length == 0
    ) {      
      this.toppingsService
        .updateTopping(this.topping)
        .subscribe({
          next: (results) => {
            this.closeModal(true);
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

  closeModal(toppingUpdated: boolean): void {
    if (toppingUpdated) {
      this.repullToppings.emit(true);
    }
    this.outModalState.emit(0);
    this.outModalVisible.emit(false);
  }
}
