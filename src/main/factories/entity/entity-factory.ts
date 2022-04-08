import { ReadAllEntityMongoRepository } from "../../../infra/db/mongodb/entity/readAll/read-all-entity-mongo-repository";
import { DbReadEntity } from "../../../data/usecases/read-entity/db-read-entity";
import { EntityController } from "../../../presentation/controllers/entity/entity-controller";

export const makeEntityController = (): EntityController => {
    const dbEntituMongoRepository = new ReadAllEntityMongoRepository()
    const dbReadEntity = new DbReadEntity(dbEntituMongoRepository)
    return new EntityController(dbReadEntity)
}