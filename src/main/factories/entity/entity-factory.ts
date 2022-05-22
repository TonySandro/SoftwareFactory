import { ReadAllEntityMongoRepository } from "../../../infra/db/mongodb/entity/readAll/read-all-entity-mongo-repository";
import { DbReadAllEntity } from "../../../data/usecases/read-all-entity/db-read-all-entity";
import { GetAllEntityController } from "../../../presentation/controllers/get-all-entity/entity-controller";

export const makeGetAllEntityController = (): GetAllEntityController => {
    const dbEntityMongoRepository = new ReadAllEntityMongoRepository()
    const dbReadAllEntity = new DbReadAllEntity(dbEntityMongoRepository)
    return new GetAllEntityController(dbReadAllEntity)
}