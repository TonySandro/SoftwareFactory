import { serverError } from './../../helpers/http/http-helper';
import { AddRating } from './../../../domain/usecases/add-rating';
import { MissingParamError } from "../../errors";
import { badRequest, success } from "../../helpers/http/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../controller-protocols";

export class AddRatingController implements Controller {
    constructor(private readonly addRating: AddRating) {
        this.addRating = addRating
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            let { assessments, entityName, commentary } = httpRequest.body
            const requiredField = ["indicate", "goBack", "satisfaction"]

            for (const field of requiredField) {
                if (!assessments[field]) {
                    return badRequest(new MissingParamError(field))
                }
            }

            if (!entityName) {
                return badRequest(new MissingParamError("entity name"))
            }

            if (commentary) {
                const { indicate, goBack, satisfaction } = assessments

                commentary = {
                    ...commentary,
                    stars: ((indicate + goBack + satisfaction) / 3).toFixed(2),
                    date: new Date()
                }
            }

            const fullRanting: any = { entityName, assessments, commentary }
            const addRatingDB = this.addRating.add(fullRanting)

            return success(addRatingDB)
        } catch (error) {
            return serverError(error)
        }

    }
}