import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Task } from '../../../models/Task';

@Component({
  selector: 'app-task-delete-modal',
  standalone: false,
  templateUrl: './task-delete.modal.html',
})
export class TaskDeleteModal {
  @Input() task?: Task;

  constructor(private modalController: ModalController) {}

  cancel(): void {
    this.modalController.dismiss(null, 'cancel');
  }

  delete(): void {
    this.modalController.dismiss(null, 'delete');
  }
}
