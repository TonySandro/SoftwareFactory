import { ok, serverError } from "../../../presentation/helpers/http/http-helper";
import { ReadEntity } from "../../../domain/usecases/get-all-entity";
import { Controller, HttpResponse } from "./entity-controller-protocols";

export class EntityController implements Controller {
    constructor(private readonly readEntity: ReadEntity) {
        this.readEntity = readEntity
    }

    async handle(): Promise<HttpResponse> {
        try {
            const allEntities = await this.readEntity.getAll()

            return ok(allEntities)
        } catch (error) {
            return serverError(error)
        }

    }

}