import { Routes, RouterModule } from '@angular/router';

import { AccountsComponent }    from './accounts.component';

const accountsRoutes: Routes = [
    {
        path: 'accounts',
        component: AccountsComponent
    },
];

export const accountsRouting = RouterModule.forChild(accountsRoutes);