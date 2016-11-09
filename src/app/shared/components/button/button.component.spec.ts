import { TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';

describe('App', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({ declarations: [ButtonComponent]});
    });
    it ('should work', () => {
        let fixture = TestBed.createComponent(ButtonComponent);
        expect(fixture.componentInstance instanceof ButtonComponent).toBe(true, 'should create ButtonComponent');
    });
});