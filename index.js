// const testModels = require("./utils/testModels");
const drawLogo = require("./src/logo");
const cli = require("./src/cli");

drawLogo().finally(() => {
  // start the command line interface
  cli().finally(() => {
    // when the user finishes the CLI, say goodbye then exit
    console.log(" ");
    console.log(" ***** Goodbye! *****");
    console.log(" ");
    process.kill(process.pid, "SIGTERM");
  });
});
