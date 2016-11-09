import { Component, Input, ContentChild, TemplateRef, Output, EventEmitter, OnChanges, animate, state, style, transition, trigger  } from '@angular/core';
import { ANIMATION } from '../../../app.constants';

@Component({
    selector: 'm-list-view',
    styleUrls: ['./list-view.component.less'],
    templateUrl: './list-view.component.html',
    /*animations: [
        trigger('animationState', [
            state(
                'void',
                style({
                    opacity: '0',
                    transform: 'translateY(-25%)',
                }),
            ),
            state(
                '*',
                style({
                    opacity: '1',
                    transform: 'translateY(0)',
                })
            ),
            transition('void => *',
                [
                    animate(ANIMATION.DURATION + ' ' + ANIMATION.EASING)
                ]
            )
        ])
    ]*/
})

export class ListViewComponent implements OnChanges {
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