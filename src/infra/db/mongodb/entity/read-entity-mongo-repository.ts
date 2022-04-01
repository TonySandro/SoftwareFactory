import { ReadEntityRepository } from "data/protocols/db/entity/read-entity-repository";
import { EntityModel } from "domain/models/entity";
import { MongoHelper } from "../helpers/mongo-helper";

export class ReadEntityMongoRepository implements ReadEntityRepository {
    async getAll(): Promise<EntityModel[]> {
        try {
            const collection = await MongoHelper.getCollection('entity')
            const entities: any[] = await collection.find({}).toArray()
            console.log(entities)
            return entities
        } catch (error) {
            return error
        }
    }
}