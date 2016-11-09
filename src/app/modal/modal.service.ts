import { ComponentRef, Compiler, Injectable, Injector, ReflectiveInjector, ViewContainerRef } from '@angular/core';
import { Observable, Subject, BehaviorSubject, ReplaySubject } from "rxjs/Rx";

@Injectable()
export class ModalService {
    private injector: Injector;
    private viewContainerRef: ViewContainerRef;

    private modalCreatedSource: Subject<boolean> = new Subject<boolean>();

    modalCreated$: Observable<boolean> = this.modalCreatedSource.asObservable();

    constructor(private compiler: Compiler) { }

    /**
     * Register an injector
     */
    registerInjector(injector: Injector): void {
        this.injector = injector;
    }

    /**
     * Registers a container's view
     */
    registerViewContainerRef(viewContainerRef: ViewContainerRef): void {
        this.viewContainerRef = viewContainerRef;
    }

    /**
     * Creates a component in a container's view
     */
    create<T>(module: any, component: any, parameters?: Object): Observable<ComponentRef<T>> {
        let componentRef$ = new ReplaySubject()

        this.compiler.compileModuleAndAllComponentsAsync(module)
            .then(factory => {
                let componentFactory = factory.componentFactories.filter(item => item.componentType === component)[0],
                    injector = ReflectiveInjector.resolveAndCreate([], this.injector),
                    componentRef = this.viewContainerRef.createComponent(componentFactory, 0, injector);

                Object.assign(componentRef.instance, parameters);

                componentRef.instance.destroy = () => {
                    componentRef.destroy();
                }

                componentRef$.next(componentRef);
                componentRef$.complete();

                this.modalCreatedSource.next(true);
            });

        return <Observable<ComponentRef<T>>> componentRef$.asObservable();
    }
}