import { TestBed } from '@angular/core/testing';

import { SharedModule } from "../shared/shared.module";

import { EntitiesComponent } from './entities.component';

import { EntitiesService } from './entities.service';

describe('App', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                EntitiesComponent,
            ],
            imports: [
                SharedModule
            ],
            providers: [
                EntitiesService
            ]
        });
    });
    it('should work', () => {
        let fixture = TestBed.createComponent(EntitiesComponent);

        expect(fixture.componentInstance instanceof EntitiesComponent).toBe(true, 'should create EntitiesComponent');
    });
});