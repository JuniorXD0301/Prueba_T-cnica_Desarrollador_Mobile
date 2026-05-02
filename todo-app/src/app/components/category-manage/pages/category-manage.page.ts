import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { combineLatest } from 'rxjs';

import { Category } from '../../../models/Category';
import { Task } from '../../../models/Task';
import { CategoryService } from '../../../services/category.service';
import { TaskService } from '../../../services/taskService.service';
import { CategoryDeleteModal } from '../modals/category-delete/category-delete.modal';
import { CategoryDetailModal } from '../modals/category-detail/category-detail.modal';

@Component({
  selector: 'app-category-manage',
  standalone: false,
  templateUrl: './category-manage.page.html',
  styleUrls: ['./category-manage.page.scss'],
})
export class CategoryManagePage implements OnInit {
  categories: Category[] = [];
  tasks: Task[] = [];

  constructor(
    private categoryService: CategoryService,
    private modalController: ModalController,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    combineLatest([this.categoryService.categories$, this.taskService.tasks$]).subscribe(([categories, tasks]) => {
      this.categories = categories;
      this.tasks = tasks;
    });
  }

  async openCategoryModal(category?: Category): Promise<void> {
    const modal = await this.modalController.create({
      component: CategoryDetailModal,
      componentProps: { category },
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss<Category | { name: string }>();
    if (role !== 'save' || !data) {
      return;
    }

    if ('id' in data) {
      await this.categoryService.updateCategory(data);
    } else {
      await this.categoryService.addCategory(data.name);
    }
  }

  async confirmDelete(category: Category): Promise<void> {
    const taskCount = this.tasks.filter((task) => task.categoryId === category.id).length;
    const modal = await this.modalController.create({
      component: CategoryDeleteModal,
      componentProps: {
        category,
        taskCount,
      },
    });
    await modal.present();

    const { role } = await modal.onWillDismiss();
    if (role === 'delete') {
      await this.categoryService.deleteCategory(category.id);
    }
  }
}
