import { NgModule } from '@angular/core';
import { SharedModule } from "../shared/shared.module";

import { DashboardComponent } from './dashboard.component';

import { DashboardService } from './dashboard.service';

import { dashboardRouting } from './dashboard.routing';


@NgModule({
    imports: [
        SharedModule,

        dashboardRouting
    ],
    declarations: [
        DashboardComponent
    ],
    providers: [
        DashboardService
    ]
})
export class DashboardModule {}