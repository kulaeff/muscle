import { Component, Input, Output, EventEmitter, animate, state, style, transition, trigger } from '@angular/core';
import { ANIMATION } from '../../../../app.constants';

@Component({
    selector: 'm-navigation-pane-item',
    styleUrls: ['./navigation-pane-item.component.less'],
    templateUrl: './navigation-pane-item.component.html',
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
            transition('void => *, * => void',
                [
                    animate(ANIMATION.DURATION + ' ' + ANIMATION.EASING)
                ]
            )
        ])
    ]*/
})

export class NavigationPaneItemComponent {
    @Input() id: string;
    @Input() selected: boolean;
    @Input() theme: string;
    @Input() title: string;

    @Output() onClick: EventEmitter<string> = new EventEmitter<string>();

    click(id: string) {
        // Emit event only if item isn't selected
        if (!this.selected) {
            this.onClick.emit(id);
        }
    }
}