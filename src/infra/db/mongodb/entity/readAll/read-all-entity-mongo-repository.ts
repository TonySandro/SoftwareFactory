import { ReadEntityRepository } from "../../../../../data/protocols/db/entity/read-entity-repository";
import { EntityModel } from "../../../../../domain/models/entity";
import { MongoHelper } from "../../helpers/mongo-helper";

export class ReadAllEntityMongoRepository implements ReadEntityRepository {
    async getEntity(): Promise<EntityModel[]> {
        try {
            const collection = await MongoHelper.getCollection('entitys')
            const entities: any[] = await collection.find({}).toArray()
            return entities
        } catch (error) {
            return error
        }
    }
}