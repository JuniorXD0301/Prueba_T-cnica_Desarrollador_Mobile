import { Injectable } from "@angular/core";
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';

import { Task } from '../models/Task';

@Injectable({
  providedIn: 'root',
})

export class TaskService {
  private readonly storageKey = 'tasks';
  private readonly tasksSubject = new BehaviorSubject<Task[]>([]);
  private storageReady: Promise<void>;

  readonly tasks$ = this.tasksSubject.asObservable();

  constructor(private storage: Storage) {
    this.storageReady = this.init();
  }

  async getTasks(): Promise<Task[]> {
    await this.storageReady;
    return this.tasksSubject.value;
  }

  async addTask(taskData: Pick<Task, 'title' | 'description' | 'categoryId'>): Promise<Task> {
    await this.storageReady;
    const now = new Date().toISOString();
    const task: Task = {
      id: Date.now(),
      title: taskData.title,
      description: taskData.description,
      categoryId: taskData.categoryId,
      completed: false,
      createdAt: now,
      updatedAt: now,
    };
    await this.save([...this.tasksSubject.value, task]);
    return task;
  }

  async updateTask(task: Task): Promise<void> {
    await this.storageReady;
    const tasks = this.tasksSubject.value.map((item) =>
      item.id === task.id ? { ...task, updatedAt: new Date().toISOString() } : item
    );
    await this.save(tasks);
  }

  async toggleCompleted(taskId: number, completed: boolean): Promise<void> {
    await this.storageReady;
    const tasks = this.tasksSubject.value.map((task) =>
      task.id === taskId ? { ...task, completed, updatedAt: new Date().toISOString() } : task
    );
    await this.save(tasks);
  }

  async deleteTask(taskId: number): Promise<void> {
    await this.storageReady;
    await this.save(this.tasksSubject.value.filter((task) => task.id !== taskId));
  }

  async hasTasksInCategory(categoryId: number): Promise<boolean> {
    await this.storageReady;
    return this.tasksSubject.value.some((task) => task.categoryId === categoryId);
  }

  private async init(): Promise<void> {
    await this.storage.create();
    const tasks = (await this.storage.get(this.storageKey)) ?? [];
    this.tasksSubject.next(tasks);
  }

  private async save(tasks: Task[]): Promise<void> {
    this.tasksSubject.next(tasks);
    await this.storage.set(this.storageKey, tasks);
  }
}
