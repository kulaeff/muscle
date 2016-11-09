import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    }
];

// TODO: Remove HashLocationStrategy
export const routing = RouterModule.forRoot(routes, {
    useHash: true
});