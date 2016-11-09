import { TestBed } from '@angular/core/testing';
import { RouterModule } from "@angular/router";
import { NavigationPaneItemComponent } from './navigation-pane-item.component';

describe('App', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                NavigationPaneItemComponent
            ],
            imports: [
                RouterModule
            ]
        });
    });
    it('should work', () => {
        let fixture = TestBed.createComponent(NavigationPaneItemComponent);

        expect(fixture.componentInstance instanceof NavigationPaneItemComponent).toBe(true, 'should create NavigationPaneItemComponent');
    });
});