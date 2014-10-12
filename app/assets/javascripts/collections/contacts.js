SendhubApp.Collections.Contacts = Backbone.Collection.extend({

  model: SendhubApp.Models.Contact,
  
  url: "api/contacts",

  getOrFetch: function(id) {
      var contact = this.get(id);
      
      if (contact) {
          return contact;
      } else {
          contact = new SendhubApp.Models.Contact({ id: id });
          contact.fetch({
             success: function() {
                 SendhubApp.Collections.contacts.add(contact);
             }
          });
          return contact;
      }
  }

});

SendhubApp.Collections.contacts = new SendhubApp.Collections.Contacts