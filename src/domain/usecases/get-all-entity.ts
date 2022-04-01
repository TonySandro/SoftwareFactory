import { EntityModel } from "domain/models/entity";

export interface ReadEntity {
    getAll(): Promise<EntityModel>
}