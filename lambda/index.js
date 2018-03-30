var Alexa = require('alexa-sdk');

exports.handler = function(event, context, callback){
  var alexa = Alexa.handler(event, context);
  alexa.dynamoDBTableName = 'UserDevice';
  alexa.registerHandlers(handlers);
  alexa.execute();
};

var handlers = {

  'NewSession': function () {
    var deviceId = this.attributes['deviceId'];
    
    if (deviceId) {
      this.emit(':ask', 'Welcome back!'); 
    } 
    else {
      this.emit(':ask', 'Welcome... I can connect to a single receiver. Just say connect to receiver.');
    }
  },

  // 'FindDevice': function () {
  //   var t = this;
  //   var eiscp = require('eiscp');
  //   this.emit(':ask', 'Looking for a device on your network...');

  //   eiscp.discover(function (err, result) {
  //     if (err) {
  //       console.log("Error message: " + result);
  //     } else {
  //       if (result && result.length == 1) {
  //         t.emit(':ask', 'Found a device named ' + result[0].model + '. Say add device to control this device.');
  //       }
  //       else if (result && result.length > 1) {
  //         console.log('Found multiple devices');
  //         t.emit(':ask', 'Found multiple devices... I currently only support one device. Please unplug one and try again.');
  //       }
  //       else {
  //         t.emit(':ask', 'Unable to find a device. Please try again.');
  //       }
  //     }
  //   });
  // },

  'Connect': function () {
    var eiscp = require('eiscp');
    eiscp.connect();
  },

  'AMAZON.StopIntent': function () {
    // State Automatically Saved with :tell
    this.emit(':tell', 'Goodbye.');
  },

  'AMAZON.CancelIntent': function () {
    // State Automatically Saved with :tell
    this.emit(':tell', 'Goodbye.');
  },

  'SessionEndedRequest': function () {
    // Force State Save When User Times Out
    this.emit(':saveState', true);
  },


};

// Expose handlers for testing.
exports.handlers = handlers;
