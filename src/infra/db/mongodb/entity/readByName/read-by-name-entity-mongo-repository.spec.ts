import { MongoHelper } from "../../helpers/mongo-helper"
import { ReadByNameEntityMongoRepository } from "./read-by-name-entity-mongo-repository"

interface SutTypes {
    sut: ReadByNameEntityMongoRepository
}

const makeSut = (): SutTypes => {
    const sut = new ReadByNameEntityMongoRepository()
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
        jest.spyOn(sut, "getEntity")

        const promise = sut.getEntity("Prefeitura")
        await expect(promise).toBeTruthy()
    })

    test('Should return throw getEntity if throws', async () => {
        const { sut } = makeSut()
        jest.spyOn(sut, "getEntity")
            .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
        const promise = sut.getEntity()

        await expect(promise).rejects.toThrow()
    })


})
