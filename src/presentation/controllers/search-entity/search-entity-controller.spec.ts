import { success } from "../../helpers/http/http-helper"
import { EntityModel } from "../../../domain/models/entity"
import { SearchEntityController } from "./search-entity-controller"

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
    const sut = new SearchEntityController()
    return {
        sut
    }
}

describe('Search Entity Controller', () => {
    test('Should return 200 if valid data is provided', async () => {
        const { sut } = makeSut()

        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(success([]))
    })
})
