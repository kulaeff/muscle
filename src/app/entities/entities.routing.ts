import { Routes, RouterModule } from '@angular/router';

import { EntitiesComponent }    from './entities.component';

const entitiesRoutes: Routes = [
    {
        path: 'entities',
        component: EntitiesComponent
    },
];

export const entitiesRouting = RouterModule.forChild(entitiesRoutes);