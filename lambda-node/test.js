
var eiscp = require('eiscp');

eiscp.connect();

//eiscp.command("main.volume=" + 3);

function volume(x) {
  eiscp.command("main.volume=" + x)
}

function get() {
  eiscp.get_commands("main", function () {

  });
}

function discover() {
  eiscp.discover(function (err, result) {
    if (err) {
      console.log("Error message: " + result);
    } else {
      if (result && result.length == 1) {
        console.log('Found a device named ' + result[0].model);
      }
      else if (result && result.length > 1) {
        console.log('Found multiple devices');
      }
      else {
        console.log('Unable to find a device. Please try again.');
      }
    }
  });  
}
