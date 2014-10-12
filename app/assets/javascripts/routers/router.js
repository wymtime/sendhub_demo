SendhubApp.Routers.Router = Backbone.Router.extend({
    routes: {
        "": "mainPage"
    },
    
    tagName: "main-container",
    
    mainPage: function() {
        SendhubApp.Collections.contacts.fetch();
        
        var view = new SendhubApp.Views.Main({
           collection: SendhubApp.Collections.contacts 
        });
        this._swapView(view);
    },
    
    _swapView: function(view) {
        if (this.currentView) {
            this.currentView.remove();
        }
        this.currentView = view;
        $("#content").html(this.currentView.render().$el);
    }
});
