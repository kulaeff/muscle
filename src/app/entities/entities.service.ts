import { Injectable } from '@angular/core';

import { Entity } from './entities.model';
import { ENTITIES } from './entities.mock';

@Injectable()
export class EntitiesService {
    getDatabases(): Promise<Entity[]> {
        return Promise.resolve(ENTITIES);
    }
}