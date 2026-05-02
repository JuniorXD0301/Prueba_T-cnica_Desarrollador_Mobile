import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './pages/tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tasks',
        loadChildren: () =>
          import('../task-list/task-list.module').then((m) => m.TaskListPageModule),
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('../category-manage/category-manage.module').then((m) => m.CategoryManagePageModule),
      },
      {
        path: 'statistics',
        loadChildren: () =>
          import('../statistics/statistics.module').then((m) => m.StatisticsPageModule),
      },
      {
        path: '',
        redirectTo: '/tabs/tasks',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/tasks',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
