import { ReadEntityRepository } from "../../../data/protocols/db/entity/read-entity-repository"
import { EntityModel } from "../../../domain/models/entity"
import { ReadEntity } from "../../../domain/usecases/get-all-entity"

export class DbReadEntityByName implements ReadEntity {
    constructor(private readonly readEntity: ReadEntityRepository) { }
    async getEntity(entityName?: string): Promise<EntityModel[]> {
        return await this.readEntity.getEntity(entityName)
    }
}