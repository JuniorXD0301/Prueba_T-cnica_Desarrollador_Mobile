import { Injectable } from "@angular/core";
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';

import { Category } from '../models/Category';
import { TaskService } from './taskService.service';

@Injectable({
  providedIn: 'root',
})

export class CategoryService {
  private readonly storageKey = 'categories';
  private readonly categoriesSubject = new BehaviorSubject<Category[]>([]);
  private storageReady: Promise<void>;

  readonly categories$ = this.categoriesSubject.asObservable();

  constructor(private storage: Storage, private taskService: TaskService) {
    this.storageReady = this.init();
  }

  async getCategories(): Promise<Category[]> {
    await this.storageReady;
    return this.categoriesSubject.value;
  }

  async addCategory(name: string): Promise<Category> {
    await this.storageReady;
    const now = new Date().toISOString();
    const category: Category = {
      id: Date.now(),
      name,
      createdAt: now,
      updatedAt: now,
    };
    await this.save([...this.categoriesSubject.value, category]);
    return category;
  }

  async updateCategory(category: Category): Promise<void> {
    await this.storageReady;
    const categories = this.categoriesSubject.value.map((item) =>
      item.id === category.id ? { ...category, updatedAt: new Date().toISOString() } : item
    );
    await this.save(categories);
  }

  async deleteCategory(categoryId: number): Promise<boolean> {
    await this.storageReady;
    const hasAssociatedTasks = await this.taskService.hasTasksInCategory(categoryId);
    if (hasAssociatedTasks) {
      return false;
    }
    await this.save(this.categoriesSubject.value.filter((category) => category.id !== categoryId));
    return true;
  }

  private async init(): Promise<void> {
    await this.storage.create();
    const categories = (await this.storage.get(this.storageKey)) ?? [];
    this.categoriesSubject.next(categories);
  }

  private async save(categories: Category[]): Promise<void> {
    this.categoriesSubject.next(categories);
    await this.storage.set(this.storageKey, categories);
  }
}
