import { TestBed } from '@angular/core/testing';
import { SecurityComponent } from './security.component';

describe('App', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({ declarations: [SecurityComponent]});
    });
    it ('should work', () => {
        let fixture = TestBed.createComponent(SecurityComponent);

        expect(fixture.componentInstance instanceof SecurityComponent).toBe(true, 'should create SecurityComponent');
    });
});