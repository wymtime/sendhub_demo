SendhubApp.Views.ContactItem = Backbone.CompositeView.extend({
    template: JST['contacts/contact_item'],
    
    tagName: 'li',
    
    events: {
        'click .edit' : 'editContact'
    },
    
    editContact: function() {
        alert("edit");
    },
    
    className: 'contact-item list-group-item',

    render: function() {
        var content = this.template({
            contact: this.model
        });
        
        this.$el.html(content);
        
        return this;
    }

});