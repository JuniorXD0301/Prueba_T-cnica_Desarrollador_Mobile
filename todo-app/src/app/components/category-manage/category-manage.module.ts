import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { CategoryDeleteModal } from './modals/category-delete/category-delete.modal';
import { CategoryDetailModal } from './modals/category-detail/category-detail.modal';
import { CategoryManagePageRoutingModule } from './category-manage-routing.module';
import { CategoryManagePage } from './pages/category-manage.page';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [CategoryDeleteModal, CategoryDetailModal, CategoryManagePage],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule, SharedModule, CategoryManagePageRoutingModule],
})
export class CategoryManagePageModule {}
