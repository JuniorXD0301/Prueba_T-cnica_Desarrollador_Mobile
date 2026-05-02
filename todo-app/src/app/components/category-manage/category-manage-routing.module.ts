import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoryManagePage } from './pages/category-manage.page';

const routes: Routes = [
  {
    path: '',
    component: CategoryManagePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryManagePageRoutingModule {}
