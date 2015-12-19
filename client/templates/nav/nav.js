Template.Nav.events({
  'click #logout_button': function() {
    Meteor.logout(function() {
      // Redirect to login
      Router.go('/');
    });

    return;
    },
  'click .athleteD': function() {
      Session.set("selectedAthlete", this.username)
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
        return Meteor.call("getNotificationsNotRead",Meteor.user().username);
    },
    notificationsAreHere: function (){
        var array = Meteor.call("getNotificationsNotRead",Meteor.user().username);
        if(typeof array != "undefined" && array != null && array.length > 0) {
            Materialize.toast("Vous avez des notifications non lues.", 3000);
            return true;
        }
        else
            return false;
    },
    selectedAthlete: function () { return Session.get("selectedAthlete") ? Session.get("selectedAthlete") : Meteor.call("getTrainerOfAthlete",Meteor.user().username)},
    athletes: function () {
      return Meteor.call("getAthletesOfTrainer",Meteor.user().username);
    }
});

Template.Nav.events({
    "click .clear_notifs": function(){
        Meteor.call("makeAllNotificationsRead", Meteor.user().username);
    }
});

Template.Nav.onRendered(function() {
    var array = Meteor.call("getNotificationsNotRead",Meteor.user().username);
    if(typeof array != "undefined" && array != null && array.length > 0)
        Materialize.toast("Vous avez des notifications non lues.", 3000);
});
