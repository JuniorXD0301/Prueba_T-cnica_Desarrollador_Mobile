import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Category } from '../../../models/Category';

@Component({
  selector: 'app-category-delete-modal',
  standalone: false,
  templateUrl: './category-delete.modal.html',
})
export class CategoryDeleteModal {
  @Input() category?: Category;
  @Input() taskCount = 0;

  constructor(private modalController: ModalController) {}

  get canDelete(): boolean {
    return this.taskCount === 0;
  }

  cancel(): void {
    this.modalController.dismiss(null, 'cancel');
  }

  delete(): void {
    if (this.canDelete) {
      this.modalController.dismiss(null, 'delete');
    }
  }
}
