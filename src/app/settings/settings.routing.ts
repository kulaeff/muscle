import { Routes, RouterModule } from '@angular/router';

import { SettingsComponent }    from './settings.component';

import { CommonComponent }    from './common/common.component';
import { SecurityComponent }    from './security/security.component';

const settingsRoutes: Routes = [
    {
        path: 'settings',
        component: SettingsComponent,
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

export const settingsRouting = RouterModule.forChild(settingsRoutes);