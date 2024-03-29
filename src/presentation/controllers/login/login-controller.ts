import { Controller, HttpRequest, HttpResponse, Authentication, Validation } from '../controller-protocols'
import { badRequest, serverError, anauthorized, success } from '../../helpers/http/http-helper'

export class LoginController implements Controller {
    constructor(
        private readonly validation: Validation,
        private readonly authentication: Authentication
    ) { }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = this.validation.validate(httpRequest.body)
            if (error) {
                return badRequest(error)
            }

            const { email, password } = httpRequest.body
            const accountName = await this.authentication.auth({
                email,
                password
            })

            if (!accountName) {
                return anauthorized()
            }

            return success({ accountName: accountName})
        } catch (error) {
            return serverError(error)
        }
    }
}