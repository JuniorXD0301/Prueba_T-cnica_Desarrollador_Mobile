import { Component, EnvironmentInjector, inject } from '@angular/core';
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  albumsOutline,
  barChartOutline,
  checkboxOutline,
} from 'ionicons/icons';
import { FeatureFlagService } from '../../../services/feature-flag';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  imports: [AsyncPipe, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);
  showStats$ = this.featureFlag.showStatistics$;

  constructor(private featureFlag: FeatureFlagService) {
    addIcons({ albumsOutline, checkboxOutline, barChartOutline });
  }
}
