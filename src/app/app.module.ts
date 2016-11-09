// Modules
import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';

import { CoreModule }     from './core/core.module';
import { ModalModule }   from './modal/modal.module';

import { AccountsModule } from './accounts/accounts.module';
import { BudgetsModule } from './budgets/budgets.module';
import { CategoriesModule } from './categories/categories.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { GoalsModule } from './goals/goals.module';
import { ReportsModule } from './reports/reports.module';
import { SettingsModule } from './settings/settings.module';
import { TransactionsModule } from './transactions/transactions.module';

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

        AccountsModule,
        BudgetsModule,
        CategoriesModule,
        DashboardModule,
        GoalsModule,
        ReportsModule,
        SettingsModule,
        TransactionsModule,
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