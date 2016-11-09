import {
    Component,
    Input,
    trigger,
    style,
    state,
    transition,
    animate
} from '@angular/core';
import { ANIMATION } from '../../../app.constants';

@Component({
    selector: 'm-progress-bar',
    templateUrl: './progress-bar.component.html',
    styleUrls: ['./progress-bar.component.less'],
    animations: [
        trigger('animationState', [
            state(
                'void',
                style({
                    transform: 'scaleX(0)'
                }),
            ),
            state(
                '*',
                style({
                    transform: 'scaleX(0.5)'
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

export class ProgressBarComponent {
    @Input() value: string;
}