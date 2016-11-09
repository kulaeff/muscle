import { TestBed } from '@angular/core/testing';

import { ListViewComponent } from './list-view.component';

describe('App', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                ListViewComponent
            ]
        });
    });
    it('should work', () => {
        let fixture = TestBed.createComponent(ListViewComponent);

        expect(fixture.componentInstance instanceof ListViewComponent).toBe(true, 'should create ListViewComponent');
    });
});