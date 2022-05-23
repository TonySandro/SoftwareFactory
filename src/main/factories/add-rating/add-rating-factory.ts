import { DbAddRating } from './../../../data/usecases/add-rating/db-add-rating';
import { AddRatingEntityMongoRepository } from './../../../infra/db/mongodb/entity/add-rating/read-all-entity-mongo-repository';
import { AddRatingController } from './../../../presentation/controllers/add-rating/add-rating-controller';

export const makeAddRatingController = (): AddRatingController => {
    const dbAddRatingMongoRepository = new AddRatingEntityMongoRepository()
    const dbAddRating = new DbAddRating(dbAddRatingMongoRepository)
    return new AddRatingController(dbAddRating)
}