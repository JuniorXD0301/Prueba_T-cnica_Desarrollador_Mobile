import { Pipe, PipeTransform } from '@angular/core';

import { Task } from '../models/Task';

@Pipe({
  name: 'categoryTaskCount',
  standalone: false,
})
export class CategoryTaskCountPipe implements PipeTransform {
  transform(tasks: Task[], categoryId: number): number {
    return tasks.filter((task) => task.categoryId === categoryId).length;
  }
}
