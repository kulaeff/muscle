import { Routes, RouterModule } from '@angular/router';

import { BudgetsComponent }    from './budgets.component';

const budgetsRoutes: Routes = [
    {
        path: 'budgets',
        component: BudgetsComponent
    },
];

export const budgetsRouting = RouterModule.forChild(budgetsRoutes);