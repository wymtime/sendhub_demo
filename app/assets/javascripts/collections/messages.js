SendhubApp.Collections.Messages = Backbone.Collection.extend({

  model: SendhubApp.Models.Message,
  
  url: "api/messages",
  
  getOrFetch: function(id) {
    var message = this.get(id);
    if (message) {
      return message;
    } else {
      message = new SendhubApp.Models.Message({ id: id });
      message.fetch({
        success: function() {
          ImgEr.Collections.messages.add(message);
        }
      });
      return message;
    }
  }

});

SendhubApp.Collections.messages = new SendhubApp.Collections.Messages