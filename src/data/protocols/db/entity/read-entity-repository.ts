import { EntityModel } from "../../../../domain/models/entity";

export interface ReadEntityRepository {
    getEntity(entityName?: string): Promise<EntityModel[]>
}