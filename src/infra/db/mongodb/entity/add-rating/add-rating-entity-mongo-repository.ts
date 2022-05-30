import { RatingModel } from 'domain/models/rating';
import { AddRatingRepository } from '../../../../../data/protocols/db/account/add-rating-repository';
import { MongoHelper } from "../../helpers/mongo-helper";

export class AddRatingEntityMongoRepository implements AddRatingRepository {
    async add(rating: any): Promise<RatingModel> {
        const collection = await MongoHelper.getCollection('entitys')
        const entityStub = await collection.findOne({ name: rating.entityName })

        const updateEntity = {
            comentary: [rating.commentary, ...entityStub.comments],
            assessments: [rating.assessments, ...entityStub.assessments]
        }

        const entity = await collection.findOneAndUpdate(
            { name: rating.entityName },
            {
                $set: {
                    comments: updateEntity.comentary,
                    assessments: updateEntity.assessments
                }
            }
        )

        return MongoHelper.map(entity);
    }
}