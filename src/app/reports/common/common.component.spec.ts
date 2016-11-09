import { TestBed } from '@angular/core/testing';
import { CommonComponent } from './common.component';

describe('App', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({ declarations: [CommonComponent]});
    });
    it ('should work', () => {
        let fixture = TestBed.createComponent(CommonComponent);

        expect(fixture.componentInstance instanceof CommonComponent).toBe(true, 'should create CommonComponent');
    });
});