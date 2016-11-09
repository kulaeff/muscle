export enum EntityType {
    DATABASE,
    TABLE
}


export class Entity {
    title: string;
    type: EntityType;
}