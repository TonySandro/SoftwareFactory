import { Router } from "express";
import { adaptRoute } from "../../main/adapters/express/express-routes-adapter";
import { makeEntityController } from "../../main/factories/entity/entity-factory";

export default (router: Router): void => {
    router.get('/entities', adaptRoute(makeEntityController()))
}