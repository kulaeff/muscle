import { TestBed } from '@angular/core/testing';
import { ProgressBarComponent } from './progress-bar.component';

describe('App', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({ declarations: [ProgressBarComponent]});
    });
    it ('should work', () => {
        let fixture = TestBed.createComponent(ProgressBarComponent);
        expect(fixture.componentInstance instanceof ProgressBarComponent).toBe(true, 'should create ProgressBarComponent');
    });
});