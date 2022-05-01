import { MissingParamError } from '../../../presentation/errors'
import { ReadEntity } from '../../../domain/usecases/get-all-entity'
import { badRequest, serverError, success } from '../../../presentation/helpers/http/http-helper'
import { HttpRequest, HttpResponse } from '../get-all-entity/entity-controller-protocols'
import { Controller } from './search-entity-controller-protocols'

export class SearchEntityController implements Controller {
    constructor(private readonly readEntity: ReadEntity) { }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { entityName } = httpRequest.body

            if (!entityName) {
                return badRequest(new MissingParamError("entityName"))
            }

            await this.readEntity.getEntity()

            return success([])
        } catch (error) {
            return serverError(error)
        }
    }
}