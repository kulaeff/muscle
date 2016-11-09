import { AccountsModule } from './accounts.module';

import { Component, OnInit } from '@angular/core';

import { Account, AccountType } from './account.model';
import { AccountsService } from './accounts.service';
import { AccountsCreateComponent } from './accounts.create.component';
import { ModalService } from '../modal/modal.service';
import { NavigationPaneItem } from '../shared/components/navigation-pane/navigation-pane.component';

@Component({
    selector: 'm-accounts',
    templateUrl: './accounts.component.html',
    styleUrls: ['./accounts.component.less']
})

export class AccountsComponent implements OnInit {
    canCreate: boolean = true;
    canEdit: boolean = false;
    canDelete: boolean = false;

    accounts: Account[];
    accountsSorted: Account[];
    accountsLength: number;

    filters: NavigationPaneItem[];

    selectedAccount: Account = null;

    constructor(private accountsService: AccountsService, private modalService: ModalService) { }

    ngOnInit() {
        this.accountsService.getAccounts().then(accounts => {
            this.accounts = accounts
            this.accountsSorted = this.accounts.sort((a, b) => (a.title > b.title) ? 1 : -1);
            this.accountsLength = this.accounts.length;
        });

        this.filters = [
            {
                id: 'all',
                title: 'Все',
                selected: true
            },
            {
                id: 'cash',
                title: 'Наличные',
            },
            {
                id: 'accounts',
                title: 'Банковские счета',
            },
            {
                id: 'cards',
                title: 'Бансковские карты',
            },
            {
                id: 'deposits',
                title: 'Вклады и депозиты',
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
                this.accountsSorted = this.accounts;
                break;
            case 'accounts':
                this.accountsSorted = this.filterAccountsByType(AccountType.ACCOUNT);
                break;
            case 'cash':
                this.accountsSorted = this.filterAccountsByType(AccountType.CASH);
                break;
            case 'cards':
                this.accountsSorted = this.filterAccountsByType(AccountType.CARD);
                break;
            case 'deposits':
                this.accountsSorted = this.filterAccountsByType(AccountType.DEPOSIT);
                break;
            default:
                this.accountsSorted = this.accounts;
        }

        this.canEdit = false;
        this.canDelete = false;

        this.accountsLength = this.accountsSorted.length;
    }

    /**
     * Handles NavigationPane's item change
     *
     * @param item
     */
    onListViewItemChange(account: Account) {
        this.canEdit = true;
        this.canDelete = true;

        this.selectedAccount = account;
    }

    /**
     * Handler for the toolbutton Create
     */
    onToolButtonCreateClick(event: any) {
        console.log(event);

        let modal$ = this.modalService.create(AccountsModule, AccountsCreateComponent, {
            ok: () => {
              alert('asd');
            }
        });
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
        // TODO: Maybe we need to select next account, after deleting current one

        this.accounts = this.accounts.filter(account => account.id !== this.selectedAccount.id);
        this.accountsSorted = this.accountsSorted.filter(account => account.id !== this.selectedAccount.id);

        this.selectedAccount = null;

        this.canEdit = false;
        this.canDelete = false;
    }

    /**
     *
     */
    filterAccountsByType(type: AccountType) {
        return this.accounts.filter(account => account.type === type);
    }
}