import { Routes, RouterModule } from '@angular/router';

import { ReportsComponent }    from './reports.component';

import { CommonComponent }    from './common/common.component';
import { SecurityComponent }    from './security/security.component';

const reportsRoutes: Routes = [
    {
        path: 'reports',
        component: ReportsComponent,
        children: [
            {
                path: '',
                redirectTo: 'common',
                pathMatch: 'full'
            },
            {
                path: 'common',
                component: CommonComponent
            },
            {
                path: 'security',
                component: SecurityComponent
            },
        ]
    },
];

export const reportsRouting = RouterModule.forChild(reportsRoutes);