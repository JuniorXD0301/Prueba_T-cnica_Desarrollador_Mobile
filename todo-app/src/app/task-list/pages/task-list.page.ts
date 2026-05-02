import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { combineLatest } from 'rxjs';

import { Category } from '../../models/Category';
import { Task } from '../../models/Task';
import { CategoryService } from '../../services/category.service';
import { TaskService } from '../../services/taskService.service';
import { TaskDeleteModal } from '../modals/task-delete/task-delete.modal';
import { TaskDetailModal } from '../modals/task-detail/task-detail.modal';


@Component({
  selector: 'app-task-list',
  standalone: false,
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
})
export class TaskListPage implements OnInit {
  categories: Category[] = [];
  selectedCategoryId: number | 'all' = 'all';
  tasks: Task[] = [];

  constructor(
    private categoryService: CategoryService,
    private modalController: ModalController,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    combineLatest([this.taskService.tasks$, this.categoryService.categories$]).subscribe(([tasks, categories]) => {
      this.tasks = tasks;
      this.categories = categories;
    });
  }

  getCategoryName(categoryId: number | null): string {
    return this.categories.find((category) => category.id === categoryId)?.name ?? 'No category';
  }

  async openTaskModal(task?: Task): Promise<void> {
    const modal = await this.modalController.create({
      component: TaskDetailModal,
      componentProps: {
        categories: this.categories,
        task,
      },
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss<Pick<Task, 'title' | 'description' | 'categoryId'> | Task>();
    if (role !== 'save' || !data) {
      return;
    }

    if ('id' in data) {
      await this.taskService.updateTask(data);
    } else {
      await this.taskService.addTask(data);
    }
  }

  async confirmDelete(task: Task): Promise<void> {
    const modal = await this.modalController.create({
      component: TaskDeleteModal,
      componentProps: { task },
    });
    await modal.present();

    const { role } = await modal.onWillDismiss();
    if (role === 'delete') {
      await this.taskService.deleteTask(task.id);
    }
  }

  async toggleCompleted(task: Task, event: CustomEvent): Promise<void> {
    const checked = Boolean(event.detail.checked);
    await this.taskService.toggleCompleted(task.id, checked);
  }
}
