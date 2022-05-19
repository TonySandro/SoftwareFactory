import { serverError } from './../../helpers/http/http-helper';
import { AddRating } from './../../../domain/usecases/add-rating';
import { MissingParamError } from "../../errors"
import { AddRatingController } from "./add-rating-controller"
import { RatingModel } from 'domain/models/rating';

const makeAddRating = (): AddRating => {
    class AddRatingStub implements AddRating {
        async add(rating: RatingModel): Promise<RatingModel> {
            return new Promise(resolve => resolve(makeFakeResponse()))

        }
    }
    return new AddRatingStub()
}

const makeFakeRequest = () => ({
    body: {
        entityName: 'any_entity',
        assessments:
        {
            indicate: 5,
            goBack: 5,
            satisfaction: 5
        }

    }
})

const makeFakeResponse = () => ({
    entityName: "any_entity",
    indicate: 5,
    goBack: 5,
    satisfaction: 5
})

const makeSut = () => {
    const addRating = makeAddRating()
    const sut = new AddRatingController(addRating)
    return {
        sut,
        addRating
    }
}

describe('Add Rating Controller', () => {
    test('Should return 200 if valid data is provided', async () => {
        const { sut } = makeSut()

        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse.statusCode).toBe(200)
    })

    test('Should return 400 if no indicate is provided', async () => {
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                entityName: 'any_entity',
                assessments:
                {
                    // indicate: 5,
                    goBack: 5,
                    satisfaction: 5
                }

            }
        }

        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('indicate'))
    })

    test('Should return 400 if goBack is not provided', async () => {
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                entityName: 'any_entity',
                assessments:
                {
                    indicate: 5,
                    // goBack: 5,
                    satisfaction: 5
                }

            }
        }

        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('goBack'))
    })

    test('Should return 400 if satisfaction is not provided', async () => {
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                entityName: 'any_entity',
                assessments:
                {
                    indicate: 5,
                    goBack: 5,
                    // satisfaction: 5
                }

            }
        }

        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('satisfaction'))
    })

    test('Should return 400 if entityName is not provided', async () => {
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                // entityName: 'any_entity',
                assessments:
                {
                    indicate: 5,
                    goBack: 5,
                    satisfaction: 5
                }

            }
        }

        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('entity name'))
    })

    test('Should return 500 if addRating throws', async () => {
        const { sut, addRating } = makeSut()
        jest.spyOn(addRating, 'add').mockImplementationOnce(async () => {
            return new Promise((resolve, reject) => reject(new Error()))
        })

        const httpResponse = await sut.handle({})
        expect(httpResponse.statusCode).toBe(500)
        expect(httpResponse).toEqual(serverError(new Error()))
    })
})
