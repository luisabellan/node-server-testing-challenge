const supertest = require("supertest");
// our server won't actually start when it's required in,
// due to the if statement in index.js
const server = require("../index");

describe("server.js", () => {
  // http calls made with supertest return promises, we can use async/await if desired
  describe("index route", () => {
    it("should return an OK status code from the index route", async () => {
      const expectedStatusCode = 200;

      // do a get request to our api (server.js) and inspect the response
      const response = await request(server).get("/");

      expect(response.status).toEqual(expectedStatusCode);

      // same test using promise .then() instead of async/await
      // let response;
      // return request(server).get('/').then(res => {
      //   response = res;

      //   expect(response.status).toEqual(expectedStatusCode);
      // })
    });

    it("should return a JSON object from the index route", async () => {
      const expectedBody = { api: "running" };

      const response = await request(server).get("/");

      expect(response.body).toEqual(expectedBody);
    });

    it("should return a JSON object from the index route", async () => {
      const response = await request(server).get("/");

      expect(response.type).toEqual("application/json");
    });
  });
});
test("GET /", async () => {
  // we start by ARRANGing the test data we need
  const endpoint = "/";
  const status = 200;

  // then we ACT on whatever we're testing
  const res = await supertest(server).get(endpoint);

  // then we ASSERT the response data
  expect(res.statusCode).toBe(status);
  expect(res.type).toBe("application/json"); // res.type is shorthand for res.headers["content-type"]
  expect(res.body.message).toBe("Welcome to our API");
});
