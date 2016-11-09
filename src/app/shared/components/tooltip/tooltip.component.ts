import { Component, ChangeDetectorRef, ElementRef, HostBinding, Inject, Input, AfterViewInit, Renderer, trigger, style, transition, animate, state } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { TooltipOptions } from './tooltip.options';
import { ANIMATION } from '../../../app.constants';

@Component({
    selector: 'tooltip',
    templateUrl: './tooltip.component.html',
    styleUrls: ['./tooltip.component.less'],
    animations: [
        trigger('animationState', [
            state(
                'void',
                style({
                    opacity: '0',
                    transform: 'translateX(5px)',
                }),
            ),
            state(
                '*',
                style({
                    opacity: '1',
                    transform: 'translateX(0)',
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
export class TooltipComponent implements AfterViewInit {
    constructor(private elementRef: ElementRef, private renderer: Renderer, private changeDetector: ChangeDetectorRef, private domSanitizer: DomSanitizer) {}

    @Input()
    content: string;

    @Input()
    top: number = 0;

    @Input()
    left: number = 0;

    @HostBinding('attr.role')
    role: string = 'tooltip';

    ngAfterViewInit() {
        this.renderer.setElementStyle(this.elementRef.nativeElement, 'left', this.left + 'px');
        this.renderer.setElementStyle(this.elementRef.nativeElement, 'top', this.top + 'px');

        this.changeDetector.detectChanges();
    }
}