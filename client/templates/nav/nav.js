Template.Nav.events({
    'click #logout_button': function () {
        Meteor.logout(function (e) {
            Router.go('/');
        });
    },
    'click #mobile_logout': function () {
        Meteor.logout(function (e) {
            Router.go('/');
        });
    },
    'click .athleteD': function () {
        Session.set("selectedAthlete", this.username);
    },
    "click .clear_notifs": function () {
        Meteor.call("makeAllNotificationsRead", Meteor.user().username);
    }
});


Template.Nav.helpers({
    trainerIs: function () {
        return Meteor.user().profile === "trainer";
    },
    isPage: function(p) { return this.page == p; },
    notificationsNotRead: function () { return NotificationsDB.find({read: false}); },
    notificationsAreHere: function () {
        var nn = nnr.get();
        if (typeof nn != "undefined" && nn != null && nn.length > 0) {
            //Materialize.toast("Vous avez des notifications non lues.", 3000);
            return true;
        }
        else
            return false;
    },
    selectedAthlete: function () {
        return Session.get("selectedAthlete");
    },
    athletes: function () { return AthletesDB.find(); }
});

Template.Nav.onRendered(function () {
    if (Meteor.user().profile === "trainer") {
            if (AthletesDB.find().fetch().length > 0)
                Session.set("selectedAthlete", AthletesDB.findOne({},{limit: 1}).username);
            else
                Session.set("selectedAthlete", "noAthlete");
    }
    var array = Meteor.call("getNotificationsNotRead", Meteor.user().username);
    if (typeof array != "undefined" && array != null && array.length > 0)
        Materialize.toast("Vous avez des notifications non lues.", 3000);
});

Template.Nav.created = function () {
    nnr = new ReactiveVar();
    nnnr = new ReactiveVar();
    aths = new ReactiveVar();
};
