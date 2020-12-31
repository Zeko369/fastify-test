const supertest = require("supertest");
const tap = require("tap");
const buildApp = require("./app");

tap.test("GET `/` route", async (t) => {
  const fastify = buildApp();

  // @ts-ignore
  t.tearDown(() => fastify.close());

  await fastify.ready();

  const res = await supertest(fastify.server)
    .get("/")
    .expect(200)
    .expect("Content-Type", "application/json; charset=utf-8");

  t.deepEqual(res.body, { hello: "world" });
});

tap.test("GET `/:name` route", (t) => {
  t.plan(12);

  const fastify = buildApp();

  // @ts-ignore
  t.tearDown(() => fastify.close());

  fastify.inject({ method: "GET", url: "/foobar" }, (err, res) => {
    t.error(err);
    t.strictEqual(res.statusCode, 200);
    t.strictEqual(
      res.headers["content-type"],
      "application/json; charset=utf-8"
    );
    t.deepEqual(res.json(), { data: "Hello foobar" });
  });

  fastify.inject({ method: "GET", url: "/bar" }, (err, res) => {
    t.error(err);
    t.strictEqual(res.statusCode, 200);
    t.strictEqual(res.headers["content-type"], "text/plain; charset=utf-8");
    t.deepEqual(res.body, "NO");
  });

  fastify.inject({ method: "GET", url: "/foo" }, (err, res) => {
    t.error(err);
    t.strictEqual(res.statusCode, 500);
    t.strictEqual(
      res.headers["content-type"],
      "application/json; charset=utf-8"
    );
    t.deepEqual(res.json(), {
      statusCode: 500,
      error: "Internal Server Error",
      message: "ERROR",
    });
  });
});
