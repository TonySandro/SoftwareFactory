import { ReadEntityRepository } from "../../../data/protocols/db/entity/read-entity-repository"
import { EntityModel } from "../../../domain/models/entity"
import { ReadEntity } from "../../../domain/usecases/get-all-entity"

export class DbReadAllEntity implements ReadEntity {
    constructor(private readonly readEntity: ReadEntityRepository) { }
    async getEntity(): Promise<EntityModel[]> {
        return await this.readEntity.getEntity()
    }
}