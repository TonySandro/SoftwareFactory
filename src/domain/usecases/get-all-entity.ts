import { EntityModel } from "../../domain/models/entity";

export interface ReadEntity {
    getEntity(): Promise<EntityModel[]>
}