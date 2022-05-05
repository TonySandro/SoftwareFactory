import { success } from "../../helpers/http/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../controller-protocols";

export class AddRatingController implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {

        return success(null)
    }
}