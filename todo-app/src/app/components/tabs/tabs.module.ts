import { NgModule } from '@angular/core';

import { TabsPage } from './pages/tabs.page';
import { TabsPageRoutingModule } from './tabs-routing.module';

@NgModule({
  imports: [TabsPage, TabsPageRoutingModule],
})
export class TabsPageModule {}
