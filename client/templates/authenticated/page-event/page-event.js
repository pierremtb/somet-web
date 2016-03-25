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
  title: function () {
    return ev.get().title;
  },
  description: function () {
    return ev.get().description;
  },
  date: function () {
    return ev.get().date;
  },
  comments: function () {
    return ev.get().comments;
  },
  id: function () {
    return ev.get()._id;
  }
});

Template.Event.events({
  "click #delete_bt": function (e, t) {
    Meteor.call("rmThisEv", t.find("#evid").innerHTML);
    document.location = "/events";
  }
});
