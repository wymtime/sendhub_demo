SendhubApp.Views.ContactForm = Backbone.CompositeView.extend({
   template: JST['contacts/contact_form'],
   
   events: {
       'click .save-contact': 'create'
   },
   
   create: function(event) {
       event.preventDefault();
       var newContact = new SendhubApp.Models.Contact({
           name: this.$('#name').val(),
           phone_number: this.$('#phone_number').val()
       });
       
       var that = this;
       
       newContact.save({}, {
           success: function() {
               that.collection.add(newContact);
           },
           
           error: function(model, response, options) {
               alert(response.responseText);
           }
       });
   },
   
   render: function() {
       var content = this.template({});
       
       this.$el.html(content);
       
       return this;
   }
});