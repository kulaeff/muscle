import {
    Component,
    Input
} from '@angular/core';

@Component({
    selector: 'm-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.less'],
})

export class ButtonComponent {
    @Input() content: string;
    @Input() role: string;
}