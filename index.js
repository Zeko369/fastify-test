const server = require("./app")({
  logger: {
    level: "info",
    prettyPrint: true,
  },
});

server.listen(3000, (err, addr) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(addr);
});
