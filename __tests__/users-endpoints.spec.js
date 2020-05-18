const supertest = require("supertest");
const server = require("../index");
const db = require("../data/config");

beforeEach(async () => {
  await db("users").truncate();
});

afterAll(async () => {
  await db.destroy();
});

describe("users integration tests", () => {
  //CREATE USER
  it("POST /users", async () => {
    const data = { name: "Jake" };
    const res = await supertest(server).post("/users").send(data);
    expect(res.statusCode).toBe(201);
    expect(res.type).toBe("application/json");
    expect(res.body.name).toBe("Jake");
  });

  // UPDATE USER
  it("UPDATE /users/:id", async () => {
    const data = {
      name: "Viktor",
    };
    let id = 1;
    const result = await supertest(server).put(`/users/${id}`).send(data);
    expect(result.status).toBe(200);
    expect(result.type).toBe("application/json");
  });

  it("GET /users", async () => {
    
     let data = {
      name: "Jake",
    };

    await db("users").insert(data);
    const res = await supertest(server).get("/users");
    expect(res.statusCode).toBe(200);
    expect(res.type).toBe("application/json");
    expect(res.body[0].name).toBe("Jake");
    expect(res.body).toHaveLength(1);
  });

  it("GET /users/:id", async () => {
    let data = {
      name: "Paul"
    };

    await db("users").insert(data);

    let id = 1;
    let result;
    result = await supertest(server).get(`/users/${id}`);

    expect(result.body).toEqual({id: 1, name: "Paul" });
  });

  it("GET /users/:id (not found)", async () => {
    let id = 50;
    const expectedStatusCode = 404;
    let res
    res = await supertest(server).get(`/users/${id}`);
    expect(res.status).toEqual(expectedStatusCode);
    expect(res.type).toBe("application/json");
  });
});
