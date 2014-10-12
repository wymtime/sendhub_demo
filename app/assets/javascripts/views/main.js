SendhubApp.Views.Main = Backbone.CompositeView.extend({
   initialize: function() {
       this.listenTo(this.collection, 'sync', this.render);
   },
   
   template: JST['main'],
   
   renderContactForm: function() {
       var contactFormView = new SendhubApp.Views.ContactForm({
           collection: this.collection
       });
       this.addSubView('#contacts-container', contactFormView.render());
   },
   
   renderContactIndex: function() {
       var contactsView = new SendhubApp.Views.ContactsIndex({
           collection: this.collection
       });
       this.addSubView('#contacts-container', contactsView.render());
   },
   
   renderMessageForm: function() {
       var messageFormView = new SendhubApp.Views.MessageForm({
           
       });
       this.addSubView('#message-container', messageFormView.render());
   },
   
   render: function() {
       var content = this.template({
          contacts: this.collection 
       });
       
       this.$el.html(content);
       
       this.renderContactForm();
       this.renderContactIndex();
       this.renderMessageForm();
       
       return this;
   }
   
});