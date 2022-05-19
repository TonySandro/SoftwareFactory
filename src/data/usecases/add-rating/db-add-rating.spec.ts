import { AddRatingRepository } from './../../protocols/db/account/add-rating-repository';
import { RatingModel } from './../../../domain/models/rating';
import { DbAddRating } from './db-add-rating'

const makeAddRatingRepository = (): AddRatingRepository => {
    class AddRatingRepositoryStub implements AddRatingRepository {
        async add(rating: RatingModel): Promise<RatingModel> {
            return new Promise(resolve => resolve(makeFakeRating()))
        }
    }
    return new AddRatingRepositoryStub()
}

const makeFakeRating = (): RatingModel => ({
    entityName: "any_entity",
    goBack: 1,
    indicate: 1,
    satisfaction: 1
})

const makeFakeRatingData = (): RatingModel => ({
    entityName: "any_entity",
    goBack: 1,
    indicate: 1,
    satisfaction: 1
})

interface SutTypes {
    sut: DbAddRating
    addRatingRepositoryStub: AddRatingRepository
}

const makeSut = (): SutTypes => {
    const addRatingRepositoryStub = makeAddRatingRepository()
    const sut = new DbAddRating(addRatingRepositoryStub)
    return {
        sut,
        addRatingRepositoryStub
    }
}

describe('Db Add Rating Usecase', () => {
    test('Should call AddAccountRepository with correct values', async () => {
        const { sut, addRatingRepositoryStub } = makeSut()
        const addSpy = jest.spyOn(addRatingRepositoryStub, 'add')

        await sut.add(makeFakeRatingData())
        expect(addSpy).toHaveBeenCalledWith({
            entityName: "any_entity",
            goBack: 1,
            indicate: 1,
            satisfaction: 1
        })
    })

    test('Should throw if addRatingRepository throws', async () => {
        const { sut, addRatingRepositoryStub } = makeSut()
        jest.spyOn(addRatingRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

        const promise = sut.add(makeFakeRatingData())
        await expect(promise).rejects.toThrow()
    })

    test('Should return an rating on success', async () => {
        const { sut } = makeSut()
        const rating = await sut.add(makeFakeRatingData())

        expect(rating).toEqual(makeFakeRating())
    })
})
