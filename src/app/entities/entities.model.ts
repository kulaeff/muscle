export enum EntityType {
    DATABASE,
    TABLE
}


export class Entity {
    name: string;
    type: EntityType;
}