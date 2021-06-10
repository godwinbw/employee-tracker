const art = require("ascii-art");

function drawLogo() {
  return art
    .font("Employee Tracker", "doom")
    .then((rendered) => {
      //rendered is the ascii
      console.log(rendered);
    })
    .catch((err) => {
      //err is an error
      console.log(" ***** EMPLOYEE *****");
      console.log(" *****  TRACKER *****");
    })
    .finally(() => {
      console.log(" ");
      console.log(" ");
      return true;
    });
}

module.exports = drawLogo;
