import { AddRatingRepository } from './../../protocols/db/account/add-rating-repository';
import { RatingModel } from 'domain/models/rating';
import { AddRating } from './../../../domain/usecases/add-rating';

export class DbAddRating implements AddRating {
    constructor(
        private readonly addRatingRepository: AddRatingRepository
    ) {
        this.addRatingRepository = addRatingRepository
    }

    async add(rating: RatingModel): Promise<RatingModel> {
        return await this.addRatingRepository.add(rating)
    }
}