import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CategoryTaskCountPipe } from '../pipes/category-task-count.pipe';
import { TaskCategoryFilterPipe } from '../pipes/task-category-filter.pipe';
import { VirtualScrollComponent } from './virtual-scroll/virtual-scroll.component';

@NgModule({
  declarations: [CategoryTaskCountPipe, TaskCategoryFilterPipe, VirtualScrollComponent],
  imports: [CommonModule],
  exports: [CategoryTaskCountPipe, TaskCategoryFilterPipe, VirtualScrollComponent],
})
export class SharedModule {}
