import { Component, OnInit } from '@angular/core';

import { NavigationPaneItem } from '../shared/components/navigation-pane/navigation-pane.component';

@Component({
    selector: 'm-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.less']
})

export class SettingsComponent implements OnInit {
    items: NavigationPaneItem[];

    ngOnInit() {
        this.items = [
            {
                id: 'common',
                title: 'Общие',
                selected: true
            },
            {
                id: 'security',
                title: 'Безопасность',
            }
        ];
    }
}