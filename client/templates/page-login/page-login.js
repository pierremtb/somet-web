Template.Login.helpers({
    loginSelected: function() { return Session.get("loginSelected"); }
});

Template.Login.onCreated(function () {
    Session.set("loginSelected",true);
});

Template.Login.events({
    "click #goSignup": function(e,t) { Session.set("loginSelected",!Session.get("loginSelected")); }
});
