import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { CategoriesComponent } from './categories.component';

import { CategoriesService } from './categories.service';

import { categoriesRouting } from './categories.routing';

@NgModule({
    imports: [
        SharedModule,

        categoriesRouting
    ],
    declarations: [
        CategoriesComponent
    ],
    providers: [
        CategoriesService
    ]
})
export class CategoriesModule {}