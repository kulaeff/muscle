import { TestBed } from '@angular/core/testing';

import { SharedModule } from "../shared/shared.module";

import { GoalsComponent } from './goals.component';

import { GoalsService } from './goals.service';

describe('App', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                GoalsComponent
            ],
            imports: [
                SharedModule
            ],
            providers: [
                GoalsService
            ]
        });
    });
    it('should work', () => {
        let fixture = TestBed.createComponent(GoalsComponent);

        expect(fixture.componentInstance instanceof GoalsComponent).toBe(true, 'should create GoalsComponent');
    });
});