Template.Event.onCreated(function () {
  ev = new ReactiveVar({});
});

Template.Event.onRendered(function () {
  var done = false;
  Tracker.autorun(function () {
    if (FlowRouter.subsReady() && !done) {
      ev.set(EventsDB.findOne());
      done = true;
    }
  });
});

Template.Event.helpers({
  title() {
    return ev.get().title;
  },
  description() {
    return ev.get().description;
  },
  date() {
    return ev.get().date;
  },
  comments() {
    return ev.get().comments;
  },
  id() {
    return ev.get()._id;
  }
});

Template.Event.events({
  "click #delete_bt": function (e, t) {
    Meteor.call("rmThisEv", t.find("#evid").innerHTML);
    document.location = "/events";
  }
});
