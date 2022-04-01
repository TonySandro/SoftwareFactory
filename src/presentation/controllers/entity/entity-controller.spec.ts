import { ServerError } from "../../../presentation/errors"
import { serverError } from "../../../presentation/helpers/http/http-helper"
import { EntityModel } from "../../../domain/models/entity"
import { ReadEntity } from "../../../domain/usecases/get-all-entity"
import { EntityController } from "./entity-controller"

const makeReadEntity = (): ReadEntity => {
    class ReadEntityStub implements ReadEntity {
        async getAll(): Promise<EntityModel> {
            return new Promise(resolve => resolve(null))
        }
    }
    return new ReadEntityStub()
}

const makeSut = (): any => {
    const readEntity = makeReadEntity()
    const sut = new EntityController(readEntity)
    return {
        sut,
        readEntity
    }
}

describe('Entity Controller', () => {
    test('Should return 500 if readEntity throws', async () => {
        const { sut, readEntity } = makeSut()
        jest.spyOn(readEntity, 'getAll').mockImplementationOnce(async () => {
            return new Promise((resolve, reject) => reject(new Error()))
        })

        const httpResponse = await sut.handle({})
        expect(httpResponse.statusCode).toBe(500)
        expect(httpResponse).toEqual(serverError(new ServerError(null)))
    })
})
