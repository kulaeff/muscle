import { TestBed } from '@angular/core/testing';

import { SharedModule } from "../shared/shared.module";

import { DashboardComponent } from './dashboard.component';

import { DashboardService } from './dashboard.service';

describe('App', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                DashboardComponent
            ],
            imports: [
                SharedModule
            ],
            providers: [
                DashboardService
            ],
        });
    });
    it('should work', () => {
        let fixture = TestBed.createComponent(DashboardComponent);

        expect(fixture.componentInstance instanceof DashboardComponent).toBe(true, 'should create DashboardComponent');
    });
});