Template.Workout.onCreated(function () {
  wk = new ReactiveVar({});
});

Template.Workout.onRendered(function () {
  var self = this;
  var done = false;
  Tracker.autorun(function () {
    if (FlowRouter.subsReady() && !done) {
      if(WorkoutsDB.findOne()) {
        wk.set(WorkoutsDB.findOne());
        Session.set('workout_id', wk.get()._id);
        done = true;
        var ec = self.find('.elevation_chart'),
          pc = self.find('.power_chart'),
          sc = self.find('.speed_chart'),
          cc = self.find('.cadence_chart');
        if (wk.get().fit_linked)
          drawWorkoutGraphs(self.workout.get(), ec, pc, sc, cc);
      }
      else {
        FlowRouter.redirect('/dashboard');
      }
    }
  });
});

Template.Workout.helpers({
  workout() {
    console.log(wk.get());
    return wk.get();
  },
  fitProcessing() {
    let fp = Session.get('fit_processing');
    wk.set(WorkoutsDB.findOne());
    if(fp)
      $('#link_fit').closeModal();
    return fp;
  }
});

Template.Workout.events({
  "click #delete_bt": function (e, t) {
    Meteor.call("rmThisWk", t.find(".wkid").innerHTML);
    document.location = "/workouts";
  },
  "click #accept_cr": function(e, t) {
    Meteor.call("setCR", Session.get('workout_id'), {
      effort: t.find('#cr_effort').value,
      pleasure: t.find('#cr_pleasure').value,
      sensations: t.find('#cr_sensations').value,
      mood: t.find('#cr_mood').value
    });
  }
});
