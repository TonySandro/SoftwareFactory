import { HttpRequest, HttpResponse, Controller, AddAccount, Validation } from "../controller-protocols"
import { badRequest, success, serverError } from "../../helpers/http/http-helper"

export class SignUpController implements Controller {
    constructor(
        private readonly addAccount: AddAccount,
        private readonly validation?: Validation
    ) {
        this.addAccount = addAccount
        this.validation = validation
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = this.validation.validate(httpRequest.body)
            if (error) {
                return badRequest(error)
            }

            const { name, email, password, cpf } = httpRequest.body
            const account = await this.addAccount.add({
                name,
                cpf,
                email,
                password
            })

            return success(account)
        } catch (error) {
            return serverError(error)
        }
    }
}