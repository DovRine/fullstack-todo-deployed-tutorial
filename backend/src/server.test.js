import supertest from "supertest";
import makeApp from "./server.js";

const app = makeApp();

describe("server", () => {
  it("exists", () => {
    expect(typeof makeApp).toBe("function");
    expect(typeof app).toBe("function");
  });
  describe("GET /todos - list todos", () => {
    it("returns status 200", async () => {
      const res = await supertest(app).get("/todos");
      expect(res.statusCode).toBe(200);
    });
    it("returns content-type json", async () => {
      const res = await supertest(app).get("/todos");
      expect(res.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });
    it("returns an array of todos", async () => {
      const res = await supertest(app).get("/todos");
      expect(Array.isArray(res.body)).toBe(true);
    });
  });
});
