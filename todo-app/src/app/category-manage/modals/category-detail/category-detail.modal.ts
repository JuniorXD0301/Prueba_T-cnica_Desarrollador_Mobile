import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

import { Category } from '../../../models/Category';

@Component({
  selector: 'app-category-detail-modal',
  standalone: false,
  templateUrl: './category-detail.modal.html',
})
export class CategoryDetailModal implements OnInit {
  @Input() category?: Category;

  form = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(50)]],
  });

  constructor(private formBuilder: FormBuilder, private modalController: ModalController) {}

  ngOnInit(): void {
    if (this.category) {
      this.form.patchValue({ name: this.category.name });
    }
  }

  cancel(): void {
    this.modalController.dismiss(null, 'cancel');
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const name = this.form.controls.name.value?.trim() ?? '';
    const data = this.category ? { ...this.category, name } : { name };
    this.modalController.dismiss(data, 'save');
  }
}
