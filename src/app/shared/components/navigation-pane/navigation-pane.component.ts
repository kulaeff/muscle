// TODO: Move NavigationPaneItemComponent into the NavigationPane

import { Component, Input, ViewChildren, QueryList, Output, EventEmitter } from '@angular/core';
import { NavigationPaneItemComponent } from './navigation-pane-item/navigation-pane-item.component';

export interface NavigationPaneItem {
    id: string;
    title: string;
    selected?: boolean;
}

@Component({
    selector: 'm-navigation-pane',
    styleUrls: ['./navigation-pane.component.less'],
    templateUrl: './navigation-pane.component.html'
})

export class NavigationPaneComponent {
    @Input() items: NavigationPaneItem[];
    @Input() theme: string;

    @Output() onChange = new EventEmitter<string>();

    @ViewChildren(NavigationPaneItemComponent)
    private navigationPaneItemComponents: QueryList<NavigationPaneItemComponent>;

    change(id: string) {
        this.navigationPaneItemComponents.forEach(navigationPaneItemComponent => navigationPaneItemComponent.selected = navigationPaneItemComponent.id == id);
        this.onChange.emit(id);
    }
}