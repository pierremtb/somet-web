Template.Event.onRendered(function () {
    var ev = EventsDB.findOne();
    console.log(ev);
    Session.set("ev", ev);
});

Template.Event.helpers({
    title: function () {
        return Session.get("ev").title;
    },
    description: function () {
        return Session.get("ev").description;
    },
    date: function () {
        return Session.get("ev").date;
    },
    comments: function () {
        return Session.get("ev").comments;
    },
    id: function() {
        return Session.get("ev")._id;
    }
});

Template.Event.events({
    "click #delete_bt": function (e, t) {
        Meteor.call("rmThisEv", t.find("#evid").innerHTML);
        document.location = "/events";
    }
});
