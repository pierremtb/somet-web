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
        Session.set("selectedAthleteName", this.complete_name);
    },
    "click .clear_notifs": function () {
        Meteor.call("makeAllNotificationsRead", Meteor.user().username);
    }
});


Template.Nav.helpers({
    trainerIs: function () {
        return Meteor.user().profile === "trainer";
    },
    dispName: function(cn, usr) { return cn == undefined ? '@' + usr : cn },
    myName: function () { return Meteor.user().profile === "trainer" ? TrainersDB.findOne({username: Meteor.user().username}).complete_name : AthletesDB.findOne({username: Meteor.user().username}).complete_name;},
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
    selectedAthleteName: function () {
        return Session.get("selectedAthleteName");
    },
    athletes: function () { return AthletesDB.find({trainer: Meteor.user().username}); }
});

Template.Nav.onRendered(function () {
    var array = Meteor.call("getNotificationsNotRead", Meteor.user().username);
    if (typeof array != "undefined" && array != null && array.length > 0)
        Materialize.toast("Vous avez des notifications non lues.", 3000);
    Session.set("selectedAthlete", AthletesDB.findOne({},{limit: 1}).username);
});

Template.Nav.created = function () {
    nnr = new ReactiveVar();
    nnnr = new ReactiveVar();
    aths = new ReactiveVar();
};
