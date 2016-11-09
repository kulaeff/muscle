import { TestBed } from '@angular/core/testing';

import { SharedModule } from "../shared/shared.module";

import { AccountsComponent } from './accounts.component';

import { AccountsService } from './accounts.service';

describe('App', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                AccountsComponent,
            ],
            imports: [
                SharedModule
            ],
            providers: [
                AccountsService
            ]
        });
    });
    it('should work', () => {
        let fixture = TestBed.createComponent(AccountsComponent);

        expect(fixture.componentInstance instanceof AccountsComponent).toBe(true, 'should create AccountsComponent');
    });
});