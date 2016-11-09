import { NgModule } from '@angular/core';
import { SharedModule } from "../shared/shared.module";

import { SettingsComponent } from './settings.component';
import { CommonComponent } from './common/common.component';
import { SecurityComponent } from './security/security.component';

import { settingsRouting } from './settings.routing';


@NgModule({
    imports: [
        SharedModule,

        settingsRouting
    ],
    declarations: [
        SettingsComponent,
        CommonComponent,
        SecurityComponent
    ]
})
export class SettingsModule {}