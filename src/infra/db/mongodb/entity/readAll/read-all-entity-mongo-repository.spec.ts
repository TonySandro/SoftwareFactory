import { MongoHelper } from "../../helpers/mongo-helper"
import { ReadAllEntityMongoRepository } from "./read-all-entity-mongo-repository"

interface SutTypes {
    sut: ReadAllEntityMongoRepository
}

const makeSut = (): SutTypes => {
    const sut = new ReadAllEntityMongoRepository()
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
        const transactionCollection = MongoHelper.getCollection('entitys')
        await (await transactionCollection).deleteMany({})
    })

    test('Should  return an read entities values', async () => {
        const { sut } = makeSut()
        jest.spyOn(sut, "getAll")

        const promise = sut.getAll()
        await expect(promise).toBeTruthy()
    })

    test('Should return throw getAll if throws', async () => {
        const { sut } = makeSut()
        jest.spyOn(sut, "getAll")
            .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
        const promise = sut.getAll()

        await expect(promise).rejects.toThrow()
    })


})
