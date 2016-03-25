function dispMins(min) {
  var h = parseInt(min / 60) < 10 ? "0" + parseInt(min / 60) : parseInt(min / 60);
  var m = min % 60 < 10 ? "0" + (min % 60) : (min % 60);
  return h + ":" + m;
}

var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

Template.Events.helpers({
  events: function () {
    let current_date = new Date();
    return EventsDB.find({date : { $gt: current_date }});
  },
  isNoEvt: function () {
    return EventsDB.find().fetch().length == 0;
  }
});

Template.Events.events({
  "click #e_submit": function (e, t) {
    Meteor.call("insertEvent", {
      owner: Meteor.user().profile === "trainer" ? Session.get("selectedAthlete") : Meteor.user().username,
      title: t.find("#e_title").value,
      date: new Date(t.find("#e_date").value),
      description: t.find("#e_description").value,
      comments: t.find("#e_comments").value,
      first_class_event: t.find("#e_first_class_event").checked,
      second_class_event: t.find("#e_second_class_event").checked,
      preparation_event: t.find("#e_preparation_event").checked
    });
  }
});

Template.Events.onCreated(function () {
  this.subscribe('eventsOfUsr', Meteor.user().profile === "trainer" ? Session.get('selectedAthlete') : Meteor.user().username)
});
