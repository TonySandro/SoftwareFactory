import { RatingModel } from './../models/rating';


export interface AddRating {
    add(rating: RatingModel): Promise<RatingModel>
}