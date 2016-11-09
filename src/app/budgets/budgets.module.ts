import { NgModule } from '@angular/core';
import { SharedModule } from "../shared/shared.module";

import { BudgetsComponent } from './budgets.component';

import { BudgetsService } from './budgets.service';

import { budgetsRouting } from './budgets.routing';

@NgModule({
    imports: [
        SharedModule,

        budgetsRouting
    ],
    declarations: [
        BudgetsComponent
    ],
    providers: [
        BudgetsService
    ]
})
export class BudgetsModule {}