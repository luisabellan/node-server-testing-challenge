/*
- when making a GET request to the `/` endpoint 
  the API should respond with status code 200 
  and the following JSON object: `{ message: "Welcome to our API" }`.
*/
const request = require("supertest"); // calling it "request" is a common practice

const server = require("../index");
const db = require("../data/config");

beforeEach(async () => {
    await db('users').truncate();
    await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

describe("user-model.js", () => {
  it("create function", async () => {
    let data = {
      name: "Paul",
    };

    await db("users").insert(data);

      let user;
      user = await db("users").where({ id: 1 }).first();
    expect(user).toEqual({
      id: 1,
      name: "Paul",
    });
  });

  it("update function", async () => {
    let data = {
      name: "Paul",
    };
    let id = "1";

    await db("users").where({ id }).insert(data);
      await db("users").where({ id }).update({name:'Paul'});
    let user = await db("users").where({ id }).first().select("name");
    expect(user).toEqual({ name: "Paul" });
  });
  it("delete function", async () => {
    // status(204).del()
    let data = {
      name: "Paco",
    };

    await db("users").insert(data);
    let id = "1";
    let users;
    users = await db("users");
    expect(users).toHaveLength(1);
    await db("users").where({ id }).first().del();
    users = await db("users");
    expect(users).toHaveLength(0);
    let user;
    user = await db("users").where({ id }).first();

    expect(user).toEqual(undefined);
  });
});
