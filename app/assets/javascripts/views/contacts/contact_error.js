SendhubApp.Views.ContactError = Backbone.CompositeView.extend({
    initialize: function(options) {
        this.message = options.message;  
    },
    
    template: JST['contacts/contact_error'],
   
    render: function() {
        var content = this.template({
           message: this.message
        });

        this.$el.html(content);

        return this;
    }
});