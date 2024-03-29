import { serverError } from "../../helpers/http/http-helper"
import { SearchEntityController } from "./search-entity-controller"
import { MissingParamError, ServerError } from "../../errors"
import { EntityModel, ReadEntity } from "../controller-protocols"

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
        expect(httpResponse.statusCode).toBe(200)
    })

    test('Should call with correct valid data', async () => {
        const { sut, readEntity } = makeSut()
        const readEntitySpy = jest.spyOn(readEntity, "getEntity")

        await sut.handle(makeFakeRequest())
        expect(readEntitySpy).toHaveBeenCalledWith(makeFakeRequest().body.entityName)
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
