SendhubApp.Views.ContactsIndex = Backbone.CompositeView.extend({
    events: {
        'click .contact-item' : 'handleClick'  
    },
    
    template: JST['contacts/index'],
    
    handleClick: function(event) {
        event.preventDefault();
        if (event.target.className.indexOf("contact-item") !== -1) {
            var $contact = $(event.target);
            $contact.toggleClass('clicked-contact');
        }
    },

    renderContacts: function() {
        this.collection.forEach(function(contact) {
            var contactView = new SendhubApp.Views.ContactItem({
                  model: contact
            });

            this.addSubView('#contacts', contactView.render());
        }, this);
    },

    render: function() {
        var content = this.template({});
        
        this.$el.html(content);
        
        this.renderContacts();
        
        return this;
    }

});
