import { Collection } from "mongodb";
import request from "supertest";
import { MongoHelper } from "../../../infra/db/mongodb/helpers/mongo-helper";
import app from "../../config/app";

let accountCollection: Collection

describe("Get all Entitys Routes", () => {
    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL as string);
    });

    afterAll(async () => {
        await MongoHelper.disconnect();
    });

    beforeEach(async () => {
        accountCollection = await MongoHelper.getCollection("entitys");
        await accountCollection.deleteMany({});
    });

    describe("GET /entities", () => {
        test("Should return 200 on success", async () => {
            await request(app)
                .get("/api/entities").expect(200);
        });
    })
});