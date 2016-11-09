import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { EntitiesComponent } from './entities.component';
import { EntitiesCreateComponent } from './entities.create.component';

import { EntitiesService } from './entities.service';

import { entitiesRouting } from './entities.routing';

@NgModule({
    imports: [
        SharedModule,

        entitiesRouting
    ],
    declarations: [
        EntitiesComponent,
        EntitiesCreateComponent
    ],
    providers: [
        EntitiesService
    ]
})
export class EntitiesModule {}