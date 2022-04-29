import { success } from '../../../presentation/helpers/http/http-helper'
import { HttpRequest, HttpResponse } from '../get-all-entity/entity-controller-protocols'
import { Controller } from './search-entity-controller-protocols'

export class SearchEntityController implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        return success([])
    }
}