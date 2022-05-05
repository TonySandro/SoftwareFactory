import { MissingParamError } from "../../errors"
import { AddRatingController } from "./add-rating-controller"


const makeFakeRequest = () => ({
    body: {
        assessments:
        {
            indicate: 5,
            goBack: 5,
            satisfaction: 5
        }

    }
})

const makeSut = () => {
    const sut = new AddRatingController()
    return {
        sut
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
})
