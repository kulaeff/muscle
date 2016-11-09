import { TestBed } from '@angular/core/testing';

import { SharedModule } from "../shared/shared.module";

import { TransactionsComponent } from './transactions.component';

import { TransactionsService } from './transactions.service';

describe('App', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                TransactionsComponent
            ],
            imports: [
                SharedModule
            ],
            providers: [
                TransactionsService
            ]
        });
    });
    it('should work', () => {
        let fixture = TestBed.createComponent(TransactionsComponent);

        expect(fixture.componentInstance instanceof TransactionsComponent).toBe(true, 'should create TransactionsComponent');
    });
});