import { makeAddRatingController } from './../../factories/add-rating/add-rating-factory';
import { Router } from "express";
import { adaptRoute } from "../../adapters/express/express-routes-adapter";

export default (router: Router): void => {
    router.get('/add-rating', adaptRoute(makeAddRatingController()))
}