function dispMins(min) {
    var h = parseInt(min/60) < 10 ? "0" + parseInt(min/60) : parseInt(min/60);
    var m = min%60 < 10 ? "0" + (min%60) : (min%60);
    return h + ":" + m;
}

var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

Template.Events.helpers({
    evts: function() { return Meteor.user().profile === "trainer" ? EventsDB.find({username: Session.get('selectedAthlete')}) : EventsDB.find();},
    isNoEvt: function() { return EventsDB.find().fetch().length == 0;}
});

Template.Events.events({
    "click #e_submit": function(e,t) {
        var d = new Date(t.find("#e_date").value);
        Meteor.call("addThisEv", {
            username: Meteor.user().profile === "trainer" ? Session.get("selectedAthlete") : Meteor.user().username,
            title:  t.find("#e_title").value,
            date:  t.find("#e_date").value,
            day: d.getDate(),
            month:  d.getMonth() + 1,
            year: d.getFullYear(),
            description: t.find("#e_description").value,
            comments: t.find("#e_comments").value,
            first_class_event: t.find("#e_first_class_event").checked,
            second_class_event: t.find("#e_second_class_event").checked,
            preparation_event: t.find("#e_preparation_event").checked
        });
    }
});

Template.Workouts.onRendered(function() {
});
