window.SendhubApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new SendhubApp.Routers.Router();
    Backbone.history.start();
  }
};

$(document).ready(function(){
  SendhubApp.initialize();
});
