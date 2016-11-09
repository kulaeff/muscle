import { TestBed } from '@angular/core/testing';
import { ToolButtonComponent } from './tool-button.component';

describe('App', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({ declarations: [ToolButtonComponent]});
    });
    it ('should work', () => {
        let fixture = TestBed.createComponent(ToolButtonComponent);
        expect(fixture.componentInstance instanceof ToolButtonComponent).toBe(true, 'should create ToolButtonComponent');
    });
});