SendhubApp.Views.MessageForm = Backbone.CompositeView.extend({
   template: JST['messages/message_form'],
   
   events: {
       'click .send-message': 'create'
   },
   
   create: function(event) {
       event.preventDefault();
       
       var $clickedContacts = $('.clicked-contact');
       var contacts = [];
       
       for (var i = 0; i < $clickedContacts.length; i++) {
           var $contact = $clickedContacts[i];
           contacts.push($contact.children[0].innerHTML);
       }
       
       var newMessage = new SendhubApp.Models.Message({
           contacts: contacts,
           text: this.$('textarea#message').val()
       });
       
       var that = this;
       
       newMessage.save({}, {
           error: function(response) {
               alert(response.responseText);
           },
           
           success: function() {
               alert("message sent");
           }
       });
   },
   
   render: function() {
       var content = this.template({});
       
       this.$el.html(content);
       
       return this;
   }
});