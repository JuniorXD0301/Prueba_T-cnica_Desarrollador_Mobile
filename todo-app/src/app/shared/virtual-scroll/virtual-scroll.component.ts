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

  @ContentChild(TemplateRef) itemTemplate?: TemplateRef<{ $implicit: T; item: T; index: number }>;

  trackByIndex(index: number): number {
    return index;
  }
}
