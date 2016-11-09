import { Component, HostBinding, HostListener, Injector, OnDestroy, OnInit, AfterViewChecked, ViewChild, ViewContainerRef, animate, group, state, style, transition, trigger } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { ModalService } from './modal.service';

import { ANIMATION } from '../app.constants';

@Component({
    selector: 'm-modals',
    templateUrl: './modal.component.html',
    styleUrls: [
        './modal.component.less'
    ],
    animations: [
        trigger('animationState', [
            state(
                'hidden',
                style({
                    left: '-100%',
                    opacity: '0',
                }),
            ),
            state(
                'shown',
                style({
                    opacity: '1',
                })
            ),
            transition('hidden => shown',
                [
                    animate('0s linear', style({ left: '0' })),
                    animate(ANIMATION.DURATION + ' linear')
                ]
            ),
            transition('shown => hidden',
                [
                        //animate('0s ' + ANIMATION.DURATION, style({ left: '-100%' })),
                        animate(ANIMATION.DURATION + ' linear')
                ]
            )
        ])
    ]
})
export class ModalsComponent implements OnInit, OnDestroy {
    private subscriptionModalCreated: Subscription;

    @HostBinding('@animationState')
    animationState: string = 'hidden';

    @HostListener('click')
    click() {
        this.animationState = 'hidden';
    }

    @ViewChild('modals', {read: ViewContainerRef})
    viewContainerRef: ViewContainerRef;

    constructor(private modalService: ModalService, private injector: Injector) {
        this.subscriptionModalCreated = this.modalService.modalCreated$.subscribe(bool => {
            this.animationState = 'shown';
        });
    }

    ngOnDestroy() {
        this.subscriptionModalCreated.unsubscribe();
    }

    ngOnInit() {
        this.modalService.registerInjector(this.injector);
        this.modalService.registerViewContainerRef(this.viewContainerRef);
    }
}