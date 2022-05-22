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
              const { assessments, entityName, commentary } = httpRequest.body
        const requiredField = ["indicate", "goBack", "satisfaction"]

        for (const field of requiredField) {
            if (!assessments[field]) {
                return badRequest(new MissingParamError(field))
            }
        }
        if (!entityName) {
            return badRequest(new MissingParamError("entity name"))
        }

        const fullRanting = { entityName, ...assessments, ...commentary }
        this.addRating.add(fullRanting)
        

        return success(fullRanting)
        } catch (error) {
            return serverError(error)
        }
      
    }
}