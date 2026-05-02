import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';

import { Category } from '../../../models/Category';
import { Task } from '../../../models/Task';
import { CategoryService } from '../../../services/category.service';
import { TaskService } from '../../../services/taskService.service';
import { CategoryStatistics } from 'src/app/models/CategoryStatistics';

@Component({
  selector: 'app-statistics',
  standalone: false,
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage implements OnInit {
  completedTotal = 0;
  statistics: CategoryStatistics[] = [];
  taskTotal = 0;
  uncompletedTotal = 0;

  constructor(
    private categoryService: CategoryService,
    private taskService: TaskService,
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.categoryService.categories$,
      this.taskService.tasks$,
    ]).subscribe(([categories, tasks]) => {
      this.taskTotal = tasks.length;
      this.completedTotal = tasks.filter((task) => task.completed).length;
      this.uncompletedTotal = tasks.length - this.completedTotal;
      this.statistics = this.buildStatistics(categories, tasks);
    });
  }

  private buildStatistics(
    categories: Category[],
    tasks: Task[],
  ): CategoryStatistics[] {
    const rows = categories.map((category) =>
      this.createRow(category.id, category.name, tasks),
    );
    const hasUncategorizedTasks = tasks.some(
      (task) => task.categoryId === null,
    );

    if (hasUncategorizedTasks) {
      rows.push(this.createRow(null, 'No category', tasks));
    }

    return rows.filter((row) => row.total > 0);
  }

  private createRow(
    categoryId: number | null,
    categoryName: string,
    tasks: Task[],
  ): CategoryStatistics {
    const categoryTasks = tasks.filter(
      (task) => task.categoryId === categoryId,
    );
    const completed = categoryTasks.filter((task) => task.completed).length;
    const total = categoryTasks.length;

    return {
      categoryId,
      categoryName,
      completed,
      uncompleted: total - completed,
      total,
      completionPercent:
        total === 0 ? 0 : Math.round((completed / total) * 100),
    };
  }
}
