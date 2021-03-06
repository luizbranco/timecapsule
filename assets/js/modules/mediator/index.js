define([
  'underscore',
  'backbone'
], function (
  _,
  Backbone
) {

  function Mediator () {
    this.services = {};
    _.extend(this, Backbone.Events);
  }

  Mediator.prototype.define = function (name, service) {
    if (this.services[name]) new Error('Service already provided!');
    this.services[name] = service;
  };

  Mediator.prototype.require = function (name, callback) {
    if (!this.services[name]) new Error('Service not provided!');
    callback(this.services[name]);
  };

  return Mediator;

});

