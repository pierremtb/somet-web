Template.UserDashGraphs.events({
  "click #previous": function (e, t) {
    dispPreviousMonth(t.data.username, t);
  },
  "click #next": function (e, t) {
    dispNextMonth(t.data.username, t);
  }
});

Template.UserDashGraphs.helpers({
  graphDate() {
    return graph_date.get();
  }
});

Template.UserDashGraphs.onCreated(function () {
  let self = this;
  Tracker.autorun(function () {
    self.subscribe("workoutsOfUsr", Meteor.user().profile.trainer ? Session.get('selectedAthlete') : Meteor.user().username);
  });
  let current_date = new Date();
  graph_date = new ReactiveVar({
    month: current_date.getMonth(),
    year: current_date.getFullYear()
  });
});

Template.UserDashGraphs.onRendered(function () {
  let self = this;
  Tracker.autorun(function () {
    if (self.subscriptionsReady()) {
      Modules.client.drawDashboardGraphs(Meteor.user().profile.trainer ? Session.get('selectedAthlete') : Meteor.user().username,
                                         graph_date.get(),
                                         self.find("#columnchart_material"),
                                         self.find("#donutchart"));
    }
  });
});

function dispPreviousMonth(me, t) {
  let date = graph_date.get();
  if (date.month > 0)
    date.month--;
  else {
    date.month = 11;
    date.year--;
  }
  graph_date.set(date);
  Modules.client.drawDashboardGraphs(me, graph_date.get(), t.find("#columnchart_material"), t.find("#donutchart"));
}

function dispNextMonth(me, t) {
  let date = graph_date.get();
  if (date.month < 11)
    date.month++;
  else {
    date.month = 0;
    date.year++;
  }
  graph_date.set(date);
  Modules.client.drawDashboardGraphs(me, graph_date.get(), t.find("#columnchart_material"), t.find("#donutchart"));
}
