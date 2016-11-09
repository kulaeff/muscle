import { Component, Input, ContentChild, TemplateRef, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
    selector: 'm-switcher',
    styleUrls: ['./switcher.component.less'],
    templateUrl: './switcher.component.html'
})

export class SwitcherComponent implements OnChanges {
    selectedItemIndex: number = null;

    @Input()
    items: any[] = [];

    @Output()
    onChange: EventEmitter<number> = new EventEmitter<number>();

    @ContentChild(TemplateRef)
    template: any;

    ngOnChanges() {
        this.selectedItemIndex = null;
    }

    selectItem(index: number) {
        this.selectedItemIndex = index;

        this.onChange.emit(this.items[this.selectedItemIndex]);
    }
}