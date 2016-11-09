import { TestBed } from '@angular/core/testing';

import { SwitcherComponent } from './switcher.component';

describe('App', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                SwitcherComponent
            ]
        });
    });
    it('should work', () => {
        let fixture = TestBed.createComponent(SwitcherComponent);

        expect(fixture.componentInstance instanceof SwitcherComponent).toBe(true, 'should create SwitcherComponent');
    });
});