const build = require("./app");

const test = async () => {
  const app = build();

  const res = await app.inject({
    method: "GET",
    url: "/",
  });

  console.log(res.statusCode);
  console.log(res.body);
};

test();
