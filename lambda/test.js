
var eiscp = require('eiscp');

eiscp.discover(function (err, result) {
  if (err) {
    console.log("Error message: " + result);
  } else {
    if (result && result.length == 1) {
      console.log('Found a device named ' + result[0].model + '. Say add device to control this device.');
    }
    else if (result && result.length > 1) {
      console.log('Found multiple devices');
    }
    else {
      console.log('Unable to find a device. Please try again.');
    }
  }
});


