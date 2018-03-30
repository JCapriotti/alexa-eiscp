var index = require('../index');

describe("Discover devices", function () {
  var mockery = require('mockery');
  var context = {};
  var eiscp = {};

  beforeEach(function () {
    mockery.enable({useCleanCache: true});
    
    context['emit'] = jasmine.createSpy('emit');
    spyOn(console, 'log');

    mockery.registerMock('eiscp', eiscp);
  });

  afterEach(function () {
    mockery.disable();
  });


  it("handles an error", function () {
    setDiscoverMockWithCallback(eiscp, true, 'some kind of problem');
    index.handlers.FindDevice.call(context);
    expect(console.log).toHaveBeenCalledWith('Error message: some kind of problem');
  });

  it("finds one device", function () {
    var result = [{
      host: '1.1.1.1',
      port: '80',
      model: 'TX-8050'
    }];

    setDiscoverMockWithCallback(eiscp, false, result);
    index.handlers.FindDevice.call(context);
    expect(context.emit).toHaveBeenCalledWith(':ask', 'Found a device named TX-8050. Say add device to control this device.');
  });

  it("finds multiple devices", function () {
    var result = [{}, {}];

    setDiscoverMockWithCallback(eiscp, false, result);
    index.handlers.FindDevice.call(context);
    expect(console.log).toHaveBeenCalledWith('Found multiple devices');
    expect(context.emit).toHaveBeenCalledWith(':ask', 'Found multiple devices... I currently only support one device. Please unplug one and try again.');
  });

  it("can't find a device", function () {
    var result = undefined;

    setDiscoverMockWithCallback(eiscp, false, result);
    index.handlers.FindDevice.call(context);
    expect(context.emit).toHaveBeenCalledWith(':ask', 'Unable to find a device. Please try again.');
  });

});

describe("Add a device", function () {
  var mockery = require('mockery');
  var context = {};
  var eiscp = {};

  beforeEach(function () {
    mockery.enable({useCleanCache: true});
    
    context['emit'] = jasmine.createSpy('emit');
    spyOn(console, 'log');

    mockery.registerMock('eiscp', eiscp);
  });

  afterEach(function () {
    mockery.disable();
  });

  it("adds a device", function () {

  });

});

function setDiscoverMockWithCallback(eiscp, error, result) {
  eiscp['discover'] = null;
  spyOn(eiscp, 'discover').and.callFake(function(callback) {
    callback(error, result);
  });
}