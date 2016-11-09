import { TestBed } from '@angular/core/testing';

import { SharedModule } from "../shared/shared.module";

import { SettingsComponent } from './settings.component';

describe('App', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                SettingsComponent
            ],
            imports: [
                SharedModule
            ]
        });
    });
    it('should work', () => {
        let fixture = TestBed.createComponent(SettingsComponent);

        expect(fixture.componentInstance instanceof SettingsComponent).toBe(true, 'should create SettingsComponent');
    });
});