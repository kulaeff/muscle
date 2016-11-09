import { TestBed } from '@angular/core/testing';

import { SharedModule } from "../shared/shared.module";

import { BudgetsComponent } from './budgets.component';

import { BudgetsService } from './budgets.service';

describe('App', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                BudgetsComponent
            ],
            imports: [
                SharedModule
            ],
            providers: [
                BudgetsService
            ]
        });
    });
    it('should work', () => {
        let fixture = TestBed.createComponent(BudgetsComponent);

        expect(fixture.componentInstance instanceof BudgetsComponent).toBe(true, 'should create BudgetsComponent');
    });
});