import { MissingParamError } from "../../errors";
import { badRequest, success } from "../../helpers/http/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../controller-protocols";

export class AddRatingController implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const { assessments } = httpRequest.body
        const requiredField = ["indicate"]

        for (const field of requiredField) {
            if (!assessments[field]) {
                return badRequest(new MissingParamError(field))
            }
        }

        return success(null)
    }
}