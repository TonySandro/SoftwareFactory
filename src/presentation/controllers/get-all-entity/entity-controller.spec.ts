import { ServerError } from "../../errors"
import { success, serverError } from "../../helpers/http/http-helper"
import { EntityModel } from "../../../domain/models/entity"
import { ReadEntity } from "../../../domain/usecases/get-all-entity"
import { GetAllEntityController } from "./entity-controller"

const makeReadEntity = (): ReadEntity => {
    class ReadEntityStub implements ReadEntity {
        async getEntity(): Promise<EntityModel[]> {
            return new Promise(resolve => resolve([makeFakeResponse()]))
        }
    }
    return new ReadEntityStub()
}

const makeFakeResponse = (): EntityModel => ({
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
})

const makeSut = (): any => {
    const readEntity = makeReadEntity()
    const sut = new GetAllEntityController(readEntity)
    return {
        sut,
        readEntity
    }
}

describe('Entity Controller', () => {
    test('Should return 500 if readEntity throws', async () => {
        const { sut, readEntity } = makeSut()
        jest.spyOn(readEntity, 'getEntity').mockImplementationOnce(async () => {
            return new Promise((resolve, reject) => reject(new Error()))
        })

        const httpResponse = await sut.handle({})
        expect(httpResponse.statusCode).toBe(500)
        expect(httpResponse).toEqual(serverError(new ServerError(null)))
    })

    test('Should call readEntity returns correct values', async () => {
        const { sut, readEntity } = makeSut()
        jest.spyOn(readEntity, 'getEntity').mockReturnValueOnce(
            new Promise(resolve => resolve(makeFakeResponse()))
        )

        const httpResponse = await sut.handle({})
        expect(httpResponse.statusCode).toBe(200)
        expect(httpResponse).toEqual(success(makeFakeResponse()))
    })

})
