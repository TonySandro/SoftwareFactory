import { EntityModel } from "domain/models/entity";

export interface ReadEntityRepository {
    getAll(): Promise<EntityModel[]>
}