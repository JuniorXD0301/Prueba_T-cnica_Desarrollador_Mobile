import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Category } from 'src/app/models/Category';
import { Task } from 'src/app/models/Task';

@Component({
  selector: 'app-task-detail-modal',
  standalone: false,
  templateUrl: './task-detail.modal.html',
})
export class TaskDetailModal implements OnInit {
  @Input() categories: Category[] = [];
  @Input() task?: Task;

  form = this.formBuilder.group({
    title: ['', [Validators.required, Validators.maxLength(80)]],
    description: [''],
    categoryId: [null as number | null, [Validators.required]],
  });

  constructor(private formBuilder: FormBuilder, private modalController: ModalController) {}

  ngOnInit(): void {
    if (!this.task) {
      return;
    }
    this.form.patchValue({
      title: this.task.title,
      description: this.task.description ?? '',
      categoryId: this.task.categoryId,
    });
  }

  cancel(): void {
    this.modalController.dismiss(null, 'cancel');
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    const data = this.task
      ? {
          ...this.task,
          title: value.title ?? '',
          description: value.description ?? '',
          categoryId: value.categoryId,
        }
      : {
          title: value.title ?? '',
          description: value.description ?? '',
          categoryId: value.categoryId,
        };

    this.modalController.dismiss(data, 'save');
  }
}
