const promptOverall = require("../src/cliPrompts");

// this function will ensure that a question has an answer provided by the user
const validateInputEntry = function (input) {
  if (input) {
    return true;
  } else {
    console.log("This entry is required.  Try again.");
    return false;
  }
};

const cli = function () {
  return new Promise(async function (resolve, reject) {
    // start accepting user input until they exit
    do {
      keepGoing = await promptOverall();
    } while (keepGoing);

    // user wants to exit
    resolve(true);
  });
};

module.exports = cli;
