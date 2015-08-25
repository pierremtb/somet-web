Template.Nav.events({  
  'click #logout_button': function() {
    Meteor.logout(function() {
      // Redirect to login
      Router.go('/');
    });

    return;
  }
});


Template.Nav.helpers({
    trainerIs: function(){ 
        if(Meteor.user().profile === "trainer") 
            return true; 
        else 
            return false;
    },
    notificationsNotRead: function (){
        return NotificationsDB.find({username: Meteor.user().username, read: false});
    },
    notificationsAreHere: function (){
        var array = NotificationsDB.find({username: Meteor.user().username, read: false}).fetch();
        if(typeof array != "undefined" && array != null && array.length > 0) {
            Materialize.toast("Vous avez des notifications non lues.", 3000);
            return true;
        }
        else
            return false;
    }
});

Template.Nav.events({
    "click .clear_notifs": function(){
        var tt = NotificationsDB.find({username: Meteor.user().username}).fetch();
        var tt_l = tt.length;
        var i;
        for(i=0;i<tt_l;i++)
            NotificationsDB.update(tt[i]._id, {$set: {read: true}});
    }
});