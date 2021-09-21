import makeApp from "./server.js";

const app = makeApp();

describe("server", () => {
  it("exists", () => {
    expect(typeof makeApp).toBe("function");
    expect(typeof app).toBe("function");
  });
});
