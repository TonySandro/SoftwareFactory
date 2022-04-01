import { MongoHelper } from "../helpers/mongo-helper"
import { ReadEntityMongoRepository } from "./read-entity-mongo-repository"

interface SutTypes {
    sut: ReadEntityMongoRepository
}

const makeSut = (): SutTypes => {
    const sut = new ReadEntityMongoRepository()
    return {
        sut
    }
}

describe('Read Entity Mongo Repository', () => {

    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL)
    })

    afterAll(async () => {
        await MongoHelper.disconnect()
    })

    beforeEach(async () => {
        const transactionCollection = MongoHelper.getCollection('entity')
        await (await transactionCollection).deleteMany({})
    })

    test('Should return an read entities values', async () => {
        const { sut } = makeSut()
        jest.spyOn(sut, "getAll")

        const promise = sut.getAll()
        await expect(promise).toBeTruthy()
    })

})
