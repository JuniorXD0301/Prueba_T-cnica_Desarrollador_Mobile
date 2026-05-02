import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { SharedModule } from '../../shared/shared.module';
import { StatisticsPageRoutingModule } from './statistics-routing.module';
import { StatisticsPage } from './pages/statistics.page';

@NgModule({
  declarations: [StatisticsPage],
  imports: [CommonModule, IonicModule, SharedModule, StatisticsPageRoutingModule],
})
export class StatisticsPageModule {}
