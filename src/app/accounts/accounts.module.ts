import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { AccountsComponent } from './accounts.component';
import { AccountsCreateComponent } from './accounts.create.component';

import { AccountsService } from './accounts.service';

import { accountsRouting } from './accounts.routing';

@NgModule({
    imports: [
        SharedModule,

        accountsRouting
    ],
    declarations: [
        AccountsComponent,
        AccountsCreateComponent
    ],
    providers: [
        AccountsService
    ]
})
export class AccountsModule {}