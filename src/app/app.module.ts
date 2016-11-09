// Modules
import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';

import { CoreModule }     from './core/core.module';
import { ModalModule }   from './modal/modal.module';

import { EntitiesModule } from './entities/entities.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { SettingsModule } from './settings/settings.module';

// Main component
import { AppComponent } from './app.component';

// Routes
import { routing } from './app.routing';

@NgModule({
    imports: [
        BrowserModule,

        CoreModule,
        ModalModule,

        routing,

        EntitiesModule,
        DashboardModule,
        SettingsModule,
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule {
}