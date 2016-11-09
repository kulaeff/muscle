import { Routes, RouterModule } from '@angular/router';

import { CategoriesComponent }    from './categories.component';

const categoriesRoutes: Routes = [
    {
        path: 'categories',
        component: CategoriesComponent
    },
];

export const categoriesRouting = RouterModule.forChild(categoriesRoutes);