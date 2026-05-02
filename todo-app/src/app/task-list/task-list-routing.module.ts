import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TaskListPage } from './pages/task-list.page';

const routes: Routes = [
  {
    path: '',
    component: TaskListPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskListPageRoutingModule {}
