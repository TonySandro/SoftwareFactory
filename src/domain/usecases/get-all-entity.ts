import { EntityModel } from "../../domain/models/entity";

export interface ReadEntity {
    getEntity(entityName?: string): Promise<EntityModel[]>
}