import { serverError, success } from "../../helpers/http/http-helper"
import { EntityModel } from "../../../domain/models/entity"
import { SearchEntityController } from "./search-entity-controller"
import { ReadEntity } from "../../../domain/usecases/get-all-entity"
import { MissingParamError, ServerError } from "../../errors"

const makeReadEntity = (): ReadEntity => {
    class ReadEntityStub implements ReadEntity {
        async getEntity(): Promise<EntityModel[]> {
            return new Promise(resolve => resolve(makeFakeResponse()))
        }
    }
    return new ReadEntityStub()
}

const makeFakeRequest = () => ({
    body: { entityName: 'any_entity' }
})

const makeFakeResponse = (): EntityModel[] => ([{
    name: "Nome da entidade",
    photos: ["foto1", "foto2", "foto3"],
    assessments: [{
        indicate: 5,
        goBack: 5,
        satisfaction: 5,
    }],
    open: "Horario de funcionamento",
    address: "Endereco",
    about: "Sobre a entidade",
    comments: [
        {
            author: "X",
            message: "Mensagem",
            starts: 5,
            date: "data da avaliacao"
        }
    ]
}])

const makeSut = () => {
    const readEntity = makeReadEntity()
    const sut = new SearchEntityController(readEntity)
    return {
        sut,
        readEntity
    }
}

describe('Search Entity Controller', () => {
    test('Should return 200 if valid data is provided', async () => {
        const { sut } = makeSut()

        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(success([]))
    })

    test('Should return 500 if readEntity throws', async () => {
        const { sut, readEntity } = makeSut()
        jest.spyOn(readEntity, 'getEntity').mockImplementationOnce(async () => {
            return new Promise((resolve, reject) => reject(new Error()))
        })
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(serverError(new ServerError(null)))
    })

    test('Should return 400 if no entityName is provided', async () => {
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                // entityName: "valid_entityName",
            }
        }

        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('entityName'))
    })
})
