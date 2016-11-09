import { Routes, RouterModule } from '@angular/router';

import { TransactionsComponent }    from './transactions.component';

const transactionsRoutes: Routes = [
    {
        path: 'transactions',
        component: TransactionsComponent
    },
];

export const transactionsRouting = RouterModule.forChild(transactionsRoutes);