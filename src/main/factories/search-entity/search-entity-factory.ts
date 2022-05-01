import { ReadByNameEntityMongoRepository } from "../../../infra/db/mongodb/entity/readByName/read-by-name-entity-mongo-repository";
import { DbReadEntityByName } from "../../../data/usecases/read-entity-by-name/db-read-entity-by-name";
import { SearchEntityController } from "../../../presentation/controllers/search-entity/search-entity-controller";

export const makeSearchEntityController = (): SearchEntityController => {
    const dbEntityMongoRepository = new ReadByNameEntityMongoRepository()
    const dbReadEntityByName = new DbReadEntityByName(dbEntityMongoRepository)
    return new SearchEntityController(dbReadEntityByName)
}
