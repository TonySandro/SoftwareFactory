import { ReadAllEntityMongoRepository } from "../../../infra/db/mongodb/entity/readAll/read-all-entity-mongo-repository";
import { DbReadEntity } from "../../../data/usecases/read-entity/db-read-entity";
import { GetAllEntityController } from "../../../presentation/controllers/get-all-entity/entity-controller";

export const makeGetAllEntityController = (): GetAllEntityController => {
    const dbEntituMongoRepository = new ReadAllEntityMongoRepository()
    const dbReadEntity = new DbReadEntity(dbEntituMongoRepository)
    return new GetAllEntityController(dbReadEntity)
}