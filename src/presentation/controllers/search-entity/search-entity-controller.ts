import { MissingParamError } from '../../../presentation/errors'
import { badRequest, serverError, success } from '../../../presentation/helpers/http/http-helper'
import { HttpRequest, HttpResponse, Controller, ReadEntity } from '../controller-protocols'

export class SearchEntityController implements Controller {
    constructor(private readonly readEntity: ReadEntity) { }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { entityName } = httpRequest.body

            if (!entityName) {
                return badRequest(new MissingParamError("entityName"))
            }

            const entity = await this.readEntity.getEntity(entityName)

            return success(entity)
        } catch (error) {
            return serverError(error)
        }
    }
}