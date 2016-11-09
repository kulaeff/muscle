import { TestBed } from '@angular/core/testing';

import { NavigationPaneComponent } from './navigation-pane.component';

describe('App', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                NavigationPaneComponent
            ]
        });
    });
    it('should work', () => {
        let fixture = TestBed.createComponent(NavigationPaneComponent);

        expect(fixture.componentInstance instanceof NavigationPaneComponent).toBe(true, 'should create NavigationPaneComponent');
    });
});