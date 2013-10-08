/*
 * Browser ID (Mozilla Persona)
 * Authentication Service
 */
define([
  "jquery"
], function (
  $
) {

  function Authentication(mediator) {
    this.mediator = mediator;
  }

  Authentication.prototype.enable = function () {
    navigator.id.watch({
      onlogin: this._onLogin.bind(this),
      onlogout: this._onLogout.bind(this)
    });
  };

  Authentication.prototype._onLogin = function (assertion) {
    var mediator = this.mediator;

    var req = $.ajax({
      type: "POST",
      url: "/auth/login",
      data: {assertion: assertion}
    });

    req.done(function () {
      mediator.navigate("/letters");
    });

    req.fail(function (xhr, status, err) {
      navigator.id.logout();
      console.log("Login failure: " + err);
    });
  };

  Authentication.prototype._onLogout = function () {
    var mediator = this.mediator;

    var req = $.ajax({
      type: "POST",
      url: "/auth/logout"
    });

    req.done(function () {
      mediator.navigate("/");
    });

    req.fail(function (xhr, status, err) {
      console.log("Logout failure: " + err);
    });
  };

  Authentication.prototype.login = function () {
    navigator.id.request();
  };

  Authentication.prototype.logout = function () {
    navigator.id.logout();
  };

  return Authentication;

});
