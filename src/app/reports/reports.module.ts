import { NgModule } from '@angular/core';
import { SharedModule } from "../shared/shared.module";

import { ReportsComponent } from './reports.component';
import { CommonComponent } from './common/common.component';
import { SecurityComponent } from './security/security.component';

import { reportsRouting } from './reports.routing';


@NgModule({
    imports: [
        SharedModule,

        reportsRouting
    ],
    declarations: [
        ReportsComponent,
        CommonComponent,
        SecurityComponent
    ]
})
export class ReportsModule {}