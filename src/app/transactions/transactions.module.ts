import { NgModule } from '@angular/core';
import { SharedModule } from "../shared/shared.module";

import { TransactionsComponent } from './transactions.component';

import { TransactionsService } from './transactions.service';

import { transactionsRouting } from './transactions.routing';

@NgModule({
    imports: [
        SharedModule,

        transactionsRouting
    ],
    declarations: [
        TransactionsComponent
    ],
    providers: [
        TransactionsService
    ]
})
export class TransactionsModule {}