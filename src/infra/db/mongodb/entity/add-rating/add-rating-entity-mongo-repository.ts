import { RatingModel } from 'domain/models/rating';
import { AddRatingRepository } from '../../../../../data/protocols/db/account/add-rating-repository';
import { MongoHelper } from "../../helpers/mongo-helper";

export class AddRatingEntityMongoRepository implements AddRatingRepository {
    async add(rating: RatingModel): Promise<RatingModel> {
        const collection = await MongoHelper.getCollection('entitys')
        const entities = await collection.find({}).toArray()
        console.log(rating.entityName, entities)

        // const result = await collection.insertOne(rating)
        // const accountData = await collection.findOne(result.insertedId)
        // return MongoHelper.map(accountData);
        return null
    }
}