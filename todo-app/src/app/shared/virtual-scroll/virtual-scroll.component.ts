import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'ion-virtual-scroll',
  standalone: false,
  templateUrl: './virtual-scroll.component.html',
  styleUrls: ['./virtual-scroll.component.scss'],
})
export class VirtualScrollComponent<T> {
  @Input() items: T[] = [];
  @Input() itemHeight = '72px';
  @Input() maxHeight = 'calc(100vh - 180px)';

  @ContentChild(TemplateRef) itemTemplate?: TemplateRef<{ $implicit: T; item: T; index: number }>;

  get itemSize(): number {
    const parsed = Number.parseInt(this.itemHeight, 10);
    return Number.isNaN(parsed) ? 72 : parsed;
  }

  trackByIndex(index: number): number {
    return index;
  }
}
