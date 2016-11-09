import {
    Component,
    OnInit
} from '@angular/core';

import { Dashboard } from './dashboard.model';

import { DashboardService } from './dashboard.service';

@Component({
    selector: 'm-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.less'],
})

export class DashboardComponent implements OnInit {
    dashboard: Dashboard[];

    constructor(private dashboardService: DashboardService) {
    }

    ngOnInit() {
        this.dashboardService.getDashboard().then(dashboard => {
            this.dashboard = dashboard;
        });
    }
}