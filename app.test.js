const build = require("./app");

let app = undefined;

describe("App", () => {
  beforeAll(async () => {
    app = await build();
    await app.ready();
  });

  afterAll(() => {
    app.close();
  });

  test("/", async () => {
    const res = await app.inject({ method: "GET", url: "/" });
    expect(res.statusCode).toEqual(200);
    expect(res.json()).toEqual({ hello: "world" });
  });

  test("/:name with random name", async () => {
    const res = await app.inject({ method: "GET", url: "/foobar" });
    expect(res.statusCode).toEqual(200);
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
  });

  test("/:name with bar", async () => {
    const res = await app.inject({ method: "GET", url: "/bar" });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual("NO");
    expect(res.headers["content-type"]).toEqual("text/plain; charset=utf-8");
  });

  test("/:name with foo", async () => {
    const res = await app.inject({ method: "GET", url: "/foo" });
    expect(res.statusCode).toEqual(500);
    expect(res.json()).toEqual({
      statusCode: 500,
      error: "Internal Server Error",
      message: "ERROR",
    });
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
  });
});
