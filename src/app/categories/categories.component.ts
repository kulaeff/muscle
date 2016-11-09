import { Component, OnInit } from '@angular/core';
import { Category, CategoryTypes } from './category.model';
import { CategoriesService } from './categories.service';
import { NavigationPaneItem } from '../shared/components/navigation-pane/navigation-pane.component';

@Component({
    selector: '.m-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.less']
})

export class CategoriesComponent implements OnInit {
    canCreate: boolean = true;
    canEdit: boolean = false;
    canDelete: boolean = false;

    categories: Category[];
    categoriesSorted: Category[];
    categoriesLength: number;

    categoryTypes: NavigationPaneItem[];

    selectedCategory: Category = null;
    selectedCategoryType: CategoryTypes = null;

    constructor(private categoriesService: CategoriesService) {}

    ngOnInit() {
        this.categoriesService.getCategories().then(categories => {
                this.categories = categories;
                this.categoriesSorted = this.categories.sort((a, b) => (a.title > b.title) ? 1 : -1);
                this.categoriesLength = this.categories.length;
            }
        );

        this.categoryTypes = [
            {
                id: 'all',
                title: 'Все',
                selected: true
            },
            {
                id: 'expense',
                title: 'Расходные',
            },
            {
                id: 'income',
                title: 'Доходные',
            },
            {
                id: 'mixed',
                title: 'Смешанные',
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
                this.selectedCategoryType = null;
                this.categoriesSorted = this.categories;
                break;
            case 'expense':
                this.selectedCategoryType = CategoryTypes.EXPENSE;
                this.categoriesSorted = this.filterCategoriesByType(this.selectedCategoryType);
                break;
            case 'income':
                this.selectedCategoryType = CategoryTypes.INCOME;
                this.categoriesSorted = this.filterCategoriesByType(this.selectedCategoryType);
                break;
            case 'mixed':
                this.selectedCategoryType = CategoryTypes.MIXED;
                this.categoriesSorted = this.filterCategoriesByType(this.selectedCategoryType);
                break;
        }

        this.canEdit = false;
        this.canDelete = false;

        this.categoriesLength = this.categoriesSorted.length;
    }

    /**
     * Handles NavigationPane's item change
     *
     * @param item
     */
    onListViewItemChange(category: Category) {
        this.canEdit = true;
        this.canDelete = true;

        this.selectedCategory = category;
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
     * Handler for the tool-button Delete
     */
    onToolButtonDeleteClick(event: any) {
        // TODO: Maybe we need to select next category, after deleting current one

        this.categories = this.categories.filter(category => category.id !== this.selectedCategory.id);
        this.categoriesSorted = this.filterCategoriesByType(this.selectedCategoryType);

        this.selectedCategory = null;

        this.canEdit = false;
        this.canDelete = false;
    }

    /**
     * Filter categories by type
     *
     * @param type
     * @returns {Category[]}
     */
    filterCategoriesByType(type: CategoryTypes) {
        if (type !== null) {
            return this.categories.filter(category => category.type == type);
        } else {
            return this.categories;
        }
    }
}