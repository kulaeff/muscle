import {
    Component,
    Input,
    HostListener,
    Output,
    EventEmitter,
    trigger,
    transition,
    state,
    style,
    animate
} from '@angular/core';
import { ANIMATION } from '../../../app.constants';

@Component({
    selector: 'm-tool-button',
    templateUrl: './tool-button.component.html',
    styleUrls: ['./tool-button.component.less'],
    animations: [
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
    ]
})

export class ToolButtonComponent {
    @Input()
    disabled: boolean;

    @Input()
    icon: string;

    @Output()
    onClick: EventEmitter<Event> = new EventEmitter<Event>();

    @HostListener('click', ['$event'])
    click(event: Event) {
        if (!this.disabled) {
            this.onClick.emit(event);
        }
    }
}