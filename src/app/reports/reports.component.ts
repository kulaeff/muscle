import {
    Component,
    OnInit
} from '@angular/core';

import {
    NavigationPaneItem
} from '../shared/components/navigation-pane/navigation-pane.component';

@Component({
    selector: 'm-reports',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.less']
})

export class ReportsComponent implements OnInit {
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