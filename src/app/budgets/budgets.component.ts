import { Component, OnInit } from '@angular/core';
import { Budget } from './budget.model';
import { BudgetsService } from './budgets.service';
import { NavigationPaneItem } from '../shared/components/navigation-pane/navigation-pane.component';

@Component({
    selector: 'm-budgets',
    templateUrl: './budgets.component.html',
    styleUrls: ['./budgets.component.less']
})

export class BudgetsComponent implements OnInit {
    canCreate: boolean = true;
    canEdit: boolean = false;
    canDelete: boolean = false;
    selectedBudget: Budget = null;

    budgets: Budget[];
    budgetsSorted: Budget[];
    budgetsLength: number;

    filters: NavigationPaneItem[];

    constructor(private budgetsService: BudgetsService) {
    }

    ngOnInit() {
        this.budgetsService.getBudgets().then(budgets => {
            this.budgets = budgets;
            this.budgetsSorted = this.budgets.sort((a, b) => (a.category.title > b.category.title) ? 1 : -1);
            this.budgetsLength = this.budgets.length;
        });

        this.filters = [
            {
                id: 'all',
                title: 'Все',
                selected: true
            },
            {
                id: 'active',
                title: 'Текущие',
            },
            {
                id: 'overspending',
                title: 'Освоенные',
            },
        ];
    }

    /**
     * Handles NavigationPane's item change
     *
     * @param id
     */
    onNavigationPaneItemChange(id: string) {
        switch (id) {
            case 'all':
                //this.budgetsSorted = this.budgets;
                break;
            case 'expense':
                //this.budgetsSorted = this.filterCategoriesByType(CategoryTypes.EXPENSE);
                break;
            case 'income':
                //this.budgetsSorted = this.filterCategoriesByType(CategoryTypes.INCOME);
                break;
            case 'mixed':
                //this.budgetsSorted = this.filterCategoriesByType(CategoryTypes.MIXED);
                break;
        }

        this.canEdit = false;
        this.canDelete = false;

        this.budgetsLength = this.budgetsSorted.length;
    }

    /**
     * Handles NavigationPane's item change
     *
     * @param item
     */
    onListViewItemChange(budget: Budget) {
        this.canEdit = true;
        this.canDelete = true;

        this.selectedBudget = budget;
    }

    /**
     * Handler for the toolbutton Create
     */
    onToolButtonCreateClick(event: any) {
        console.log(event);
    }

    /**
     * Handler for the toolbutton Edit
     */
    onToolButtonEditClick(event: any) {
        console.log(event);
    }

    /**
     * Handler for the toolbutton Delete
     */
    onToolButtonDeleteClick(event: any) {
        // TODO: Maybe we need to select next category, after deleting current one

        this.budgets = this.budgets.filter(category => category.id !== this.selectedBudget.id);
        this.budgetsSorted = this.budgets;

        this.selectedBudget = null;

        this.canEdit = false;
        this.canDelete = false;
    }
}