import { Injectable } from '@angular/core';
import { RemoteConfig } from '@angular/fire/remote-config';
import { fetchAndActivate, getValue } from '@angular/fire/remote-config';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FeatureFlagService {
  private showStatisticsSubject = new BehaviorSubject<boolean>(false);
  showStatistics$ = this.showStatisticsSubject.asObservable();

  constructor(private remoteConfig: RemoteConfig) {
    this.remoteConfig.settings.minimumFetchIntervalMillis = 10000;
    this.loadFlags();
  }

  async loadFlags() {
    await fetchAndActivate(this.remoteConfig);
    const value = getValue(
      this.remoteConfig,
      'show_statistics_tab',
    ).asBoolean();
    this.showStatisticsSubject.next(value);
  }
}
