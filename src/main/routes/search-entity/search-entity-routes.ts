import { Router } from "express";
import { makeSearchEntityController } from "../../factories/search-entity/search-entity-factory";
import { adaptRoute } from '../../adapters/express/express-routes-adapter'

export default (router: Router): void => {
    router.get('/entity/:entityName', adaptRoute(makeSearchEntityController()))
}