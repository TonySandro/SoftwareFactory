import { DbReadEntity } from "data/usecases/read-entity/db-read-entity";
import { ReadEntityMongoRepository } from "infra/db/mongodb/entity/read-entity-mongo-repository";
import { EntityController } from "../../../presentation/controllers/entity/entity-controller";

export const makeEntityController = (): EntityController => {
    const dbEntituMongoRepository = new ReadEntityMongoRepository()
    const dbReadEntity = new DbReadEntity(dbEntituMongoRepository)
    return new EntityController(dbReadEntity)
}