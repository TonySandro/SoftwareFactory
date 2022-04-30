import { ReadEntity } from '../../../domain/usecases/get-all-entity'
import { serverError, success } from '../../../presentation/helpers/http/http-helper'
import { HttpRequest, HttpResponse } from '../get-all-entity/entity-controller-protocols'
import { Controller } from './search-entity-controller-protocols'

export class SearchEntityController implements Controller {
    constructor(private readonly readEntity: ReadEntity) { }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            await this.readEntity.getAll()

            return success([])
        } catch (error) {
            return serverError(error)
        }
    }
}