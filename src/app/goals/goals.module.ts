import { NgModule } from '@angular/core';
import { SharedModule } from "../shared/shared.module";

import { GoalsComponent } from './goals.component';

import { GoalsService } from './goals.service';

import { goalsRouting } from './goals.routing';

@NgModule({
    imports: [
        SharedModule,

        goalsRouting
    ],
    declarations: [
        GoalsComponent
    ],
    providers: [
        GoalsService
    ]
})
export class GoalsModule {}