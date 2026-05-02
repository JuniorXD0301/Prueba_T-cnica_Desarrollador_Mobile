import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { SharedModule } from '../../shared/shared.module';
import { TaskDeleteModal } from './modals/task-delete/task-delete.modal';

import { TaskListPageRoutingModule } from './task-list-routing.module';
import { TaskListPage } from './pages/task-list.page';
import { TaskDetailModal } from './modals/task-detail/task-detail.modal';

@NgModule({
  declarations: [TaskDeleteModal, TaskDetailModal, TaskListPage],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule, SharedModule, TaskListPageRoutingModule],
})
export class TaskListPageModule {}
