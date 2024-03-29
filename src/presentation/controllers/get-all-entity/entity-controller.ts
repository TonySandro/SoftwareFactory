import { success, serverError } from "../../helpers/http/http-helper";
import { Controller, HttpResponse, ReadEntity } from "../controller-protocols";

export class GetAllEntityController implements Controller {
    constructor(private readonly readEntity: ReadEntity) {
        this.readEntity = readEntity
    }

    async handle(): Promise<HttpResponse> {
        try {
            const allEntities = await this.readEntity.getEntity()

            return success(allEntities)
        } catch (error) {
            return serverError(error)
        }

    }

}