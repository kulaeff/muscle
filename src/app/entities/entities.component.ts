import { EntitiesModule } from './entities.module';

import { Component, OnInit } from '@angular/core';

import { Entity, EntityType } from './entities.model';
import { EntitiesService } from './entities.service';
import { EntitiesCreateComponent } from './entities.create.component';
import { ModalService } from '../modal/modal.service';
import { NavigationPaneItem } from '../shared/components/navigation-pane/navigation-pane.component';

@Component({
    selector: 'm-entities',
    templateUrl: './entities.component.html',
    styleUrls: ['./entities.component.less']
})

export class EntitiesComponent implements OnInit {
    canCreate: boolean = true;
    canEdit: boolean = false;
    canDelete: boolean = false;

    entities: Entity[];
    entitiesSorted: Entity[];
    entitiesLength: number;

    filters: NavigationPaneItem[];

    selectedEntity: Entity = null;

    constructor(private entitiesService: EntitiesService, private modalService: ModalService) { }

    ngOnInit() {
        this.entitiesService.getDatabases().then(entities => {
            this.entities = entities;
            this.entitiesSorted = this.entities.sort((a, b) => (a.title > b.title) ? 1 : -1);
            this.entitiesLength = this.entities.length;
        });

        this.filters = [
            {
                id: 'all',
                title: 'Все',
                selected: true
            },
            {
                id: 'cash',
                title: 'Наличные',
            },
            {
                id: 'accounts',
                title: 'Банковские счета',
            },
            {
                id: 'cards',
                title: 'Бансковские карты',
            },
            {
                id: 'deposits',
                title: 'Вклады и депозиты',
            },
        ];
    }

    /**
     * Handles NavigationPane's item change
     *
     * @param id
     */
    onNavigationPaneItemChange(id: string) {
        switch (id) {
            case 'all':
                this.entitiesSorted = this.entities;
                break;
            case 'accounts':
                this.entitiesSorted = this.filterEntitiesByType(EntityType.DATABASE);
                break;
            case 'cash':
                this.entitiesSorted = this.filterEntitiesByType(EntityType.TABLE);
                break;
            default:
                this.entitiesSorted = this.entities;
        }

        this.canEdit = false;
        this.canDelete = false;

        this.entitiesLength = this.entitiesSorted.length;
    }

    /**
     * Handles NavigationPane's item change
     *
     * @param item
     */
    onListViewItemChange(account: Entity) {
        this.canEdit = true;
        this.canDelete = true;

        this.selectedEntity = account;
    }

    /**
     * Handler for the toolbutton Create
     */
    onToolButtonCreateClick(event: any) {
        console.log(event);

        let modal$ = this.modalService.create(EntitiesModule, EntitiesCreateComponent, {
            ok: () => {
              alert('asd');
            }
        });
    }

    /**
     * Handler for the toolbutton Edit
     */
    onToolButtonEditClick(event: any) {
        console.log(event);
    }

    /**
     * Handler for the toolbutton Delete
     */
    onToolButtonDeleteClick(event: any) {
        // TODO: Maybe we need to select next account, after deleting current one

        this.entities = this.entities.filter(entity => entity.id !== this.selectedEntity.id);
        this.entitiesSorted = this.entitiesSorted.filter(entity => entity.id !== this.selectedEntity.id);

        this.selectedEntity = null;

        this.canEdit = false;
        this.canDelete = false;
    }

    /**
     *
     */
    filterEntitiesByType(type: EntityType) {
        return this.entities.filter(entity => entity.type === type);
    }
}