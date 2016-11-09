import { TestBed } from '@angular/core/testing';

import { SharedModule } from "../shared/shared.module";

import { ReportsComponent } from './reports.component';

describe('App', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                ReportsComponent
            ],
            imports: [
                SharedModule
            ],
        });
    });
    it ('should work', () => {
        let fixture = TestBed.createComponent(ReportsComponent);

        expect(fixture.componentInstance instanceof ReportsComponent).toBe(true, 'should create ReportsComponent');
    });
});