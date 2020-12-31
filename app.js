const fastify = require("fastify").default;

const build = (opts = {}) => {
  const app = fastify(opts);

  app.get("/", async () => {
    return { hello: "world" };
  });

  app.get("/:name", async (req, res) => {
    // @ts-ignore
    if (req.params.name === "bar") {
      return "NO";
    }

    // @ts-ignore
    if (req.params.name === "foo") {
      throw new Error("ERROR");
    }

    // @ts-ignore
    return { data: `Hello ${req.params.name}` };
  });

  return app;
};

module.exports = build;
