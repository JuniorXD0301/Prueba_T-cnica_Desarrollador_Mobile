import { Pipe, PipeTransform } from '@angular/core';

import { Task } from '../models/Task';

@Pipe({
  name: 'taskCategoryFilter',
  standalone: false,
})
export class TaskCategoryFilterPipe implements PipeTransform {
  transform(tasks: Task[], categoryId: number | 'all' | null): Task[] {
    if (!categoryId || categoryId === 'all') {
      return tasks;
    }
    return tasks.filter((task) => task.categoryId === categoryId);
  }
}
