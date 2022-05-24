import { AddRatingEntityMongoRepository } from './add-rating-entity-mongo-repository';
import { MongoHelper } from "../../helpers/mongo-helper"

const makeFakeRequest = () => ({
    entityName: 'Prefeitura',

    indicate: 5,
    goBack: 5,
    satisfaction: 5,

    autor: 'Tony',
    message: 'Mensagem',
    star: 5,
})

interface SutTypes {
    sut: AddRatingEntityMongoRepository
}

const makeSut = (): SutTypes => {
    const sut = new AddRatingEntityMongoRepository()
    return {
        sut
    }
}

describe('Read By Name Entity Mongo Repository', () => {

    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL)
    })

    afterAll(async () => {
        await MongoHelper.disconnect()
    })

    beforeEach(async () => {
        const transactionCollection = MongoHelper.getCollection('entitys')
        await (await transactionCollection).deleteMany({})
    })

    test('Should  return an read entities values', async () => {
        const { sut } = makeSut()
        jest.spyOn(sut, "add")
       
        const promise = sut.add(makeFakeRequest())
        await expect(promise).toBeTruthy()
    })

    test('Should return throw add if throws', async () => {
        const { sut } = makeSut()
        jest.spyOn(sut, "add")
            .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
        const promise = sut.add(makeFakeRequest())

        await expect(promise).rejects.toThrow()
    })


})
