import { ReadEntityRepository } from "data/protocols/db/entity/read-entity-repository"
import { EntityModel } from "domain/models/entity"
import { ReadEntity } from "domain/usecases/get-all-entity"

export class DbReadEntity implements ReadEntity {
    constructor(private readonly readEntity: ReadEntityRepository) { }
    async getAll(): Promise<EntityModel[]> {
        return await this.readEntity.getAll()
    }
}