function dispMins(min) {
  var h = parseInt(min / 60) < 10 ? "0" + parseInt(min / 60) : parseInt(min / 60);
  var m = min % 60 < 10 ? "0" + (min % 60) : (min % 60);
  return h + ":" + m;
}

var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

Template.Events.helpers({
  selector() {
    return {owner: Meteor.user().profile.trainer ? Session.get("selectedAthlete") : Meteor.user().username}
  },
  events() {
    let current_date = new Date();
    return EventsDB.find({date : { $gt: current_date }});
  },
  isNoEvt() {
    return EventsDB.find().fetch().length == 0;
  }
});

Template.Events.events({
  'click tbody > tr': function (event) {
    var dataTable = $(event.target).closest('table').DataTable();
    var rowData = dataTable.row(event.currentTarget).data();
    if (!rowData) return;
    FlowRouter.go('/event/' + rowData._id);
  },
  "click #e_submit": function (e, t) {
    Meteor.call("insertEvent", {
      owner: Meteor.user().profile.trainer ? Session.get("selectedAthlete") : Meteor.user().username,
      name: t.find("#e_title").value,
      date: new Date(t.find("#e_date").value),
      description: t.find("#e_description").value,
      place: t.find("#e_place").value,
      class: t.find("#e_first_class_event").checked ? 'first' : t.find("#e_second_class_event").checked ? 'second' : 'preparation'
    });
  }
});

Template.Events.onCreated(function () {
  this.subscribe('eventsOfUsr', Meteor.user().profile === "trainer" ? Session.get('selectedAthlete') : Meteor.user().username)
});

Template.Events.onRendered(function() {
  Tracker.autorun(function () {
    if (GoogleMaps.loaded()) {
      $("#e_place").geocomplete();
    }
  });
});
