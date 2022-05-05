import { AddRatingController } from "./add-rating-controller"


const makeFakeRequest = () => ({
    body: {}
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
})
