import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./components/tabs/tabs.module').then((m) => m.TabsPageModule),
  },
];
