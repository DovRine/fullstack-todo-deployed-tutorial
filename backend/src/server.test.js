import supertest from "supertest";

import makeApp from "./server.js";

const app = makeApp();

describe("server", () => {
  it("exists", () => {
    expect(typeof makeApp).toBe("function");
    expect(typeof app).toBe("function");
  });
  it("GET /todos - returns an array of todos", (done) => {
    supertest(app)
      .get("/todos")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        expect(Array.isArray(res.body)).toBe(true);
        done();
      });
  });
});
