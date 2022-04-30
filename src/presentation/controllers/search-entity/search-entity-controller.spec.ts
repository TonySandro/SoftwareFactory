import { serverError, success } from "../../helpers/http/http-helper"
import { EntityModel } from "../../../domain/models/entity"
import { SearchEntityController } from "./search-entity-controller"
import { ReadEntity } from "../../../domain/usecases/get-all-entity"
import { ServerError } from "../../errors"

const makeReadEntity = (): ReadEntity => {
    class ReadEntityStub implements ReadEntity {
        async getAll(): Promise<EntityModel[]> {
            return new Promise(resolve => resolve(makeFakeResponse()))
        }
    }
    return new ReadEntityStub()
}

const makeFakeRequest = () => ({
    body: 'any_entity'
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
        jest.spyOn(readEntity, 'getAll').mockImplementationOnce(async () => {
            return new Promise((resolve, reject) => reject(new Error()))
        })
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(serverError(new ServerError(null)))
    })
})
