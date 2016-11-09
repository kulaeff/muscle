import { TestBed } from '@angular/core/testing';

import { SharedModule } from "../shared/shared.module";

import { CategoriesComponent } from './categories.component';

import { CategoriesService } from './categories.service';

describe('App', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                CategoriesComponent
            ],
            imports: [
                SharedModule
            ],
            providers: [
                CategoriesService
            ]
        });
    });
    it('should work', () => {
        let fixture = TestBed.createComponent(CategoriesComponent);

        expect(fixture.componentInstance instanceof CategoriesComponent).toBe(true, 'should create CategoriesComponent');
    });
});