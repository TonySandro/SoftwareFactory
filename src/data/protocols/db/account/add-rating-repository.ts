import { RatingModel } from './../../../../domain/models/rating';

export interface AddRatingRepository {
    add(rating: RatingModel): Promise<RatingModel>

}