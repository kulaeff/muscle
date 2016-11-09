import { ComponentFactoryResolver, ComponentRef, Directive, HostListener, Injector, Input, ReflectiveInjector, ViewContainerRef } from '@angular/core';
import { TooltipComponent } from './tooltip.component';
import { TooltipOptions } from './tooltip.options';

/**
 * Directive to show a tooltip
 */
@Directive({
    selector: '[tooltip]'
})
export class TooltipDirective {
    private disabled: boolean = false;
    private timeoutID: number = 0;

    /**
     * Reference to the component TooltipComponent
     */
    private componentRef: ComponentRef<TooltipComponent>;

    constructor (private componentFactoryResolver: ComponentFactoryResolver, private viewContainerRef: ViewContainerRef) {}

    /**
     * The text which should be displayed in a tooltip
     */
    @Input()
    tooltip: string;

    /**
     * Handler for the host's mousemove event
     */
    @HostListener('mousemove', ['$event']) mousemove(event: MouseEvent) {
        if (!this.disabled) {
            if (this.timeoutID) {
                clearTimeout(this.timeoutID);
            }

            this.timeoutID = window.setTimeout(() => {
                this.disabled = true;

                this.render({
                    left: event.offsetX,
                    top: event.offsetY
                });
            }, 500);
        }
    }

    /**
     * Handler for the host's mouseleave event
     */
    @HostListener('mouseleave') mouseleave() {
        this.destroy();
    }

    /**
     * Creates the component TooltipComponent and passes data to it
     */
    render(position: any): void {
        // TODO: refactor with ReflectiveInjector
        let componentfactory = this.componentFactoryResolver.resolveComponentFactory(TooltipComponent),
            rect = this.viewContainerRef.element.nativeElement.getBoundingClientRect();
            /*tooltipOptions = new TooltipOptions({
                left: coords.left,
                top: coords.top
            });
            injector = ReflectiveInjector.resolveAndCreate([{
                provide: TooltipOptions, useValue: tooltipOptions
            }]);*/

        this.componentRef = this.viewContainerRef.createComponent(componentfactory);
        this.componentRef.instance.content = this.tooltip;
        this.componentRef.instance.left = position.left;
        this.componentRef.instance.top = position.top + 26;
    }

    /**
     * Destroys TooltipComponent
     */
    destroy(): void {
        this.disabled = false;

        clearTimeout(this.timeoutID);

        if (this.componentRef) {
            this.componentRef.destroy();
        }
    }
}