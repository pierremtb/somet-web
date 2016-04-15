Template.Plan.onCreated(function () {
  pl = new ReactiveVar({});
});

Template.Plan.onRendered(function () {
  var done = false;
  Tracker.autorun(function () {
    if (FlowRouter.subsReady() && !done) {
      if(PlansDB.findOne()) {
        pl.set(PlansDB.findOne());
        done = true;
      } else {
        FlowRouter.redirect('/dashboard');
      }
    }
  });
});

Template.Plan.helpers({
    title() { return pl.get().title },
    _id() { return pl.get()._id },
    days() { return pl.get().days },
    monday_date() { return pl.get().monday_date },
    monday_support() { return this.monday_support},
    mondayType: function() {
        if(this.monday_type == "wk")
            return "Entrainement";
        else if(this.monday_type == "rc")
            return "Compétition";
        else if(this.monday_type == "nth")
            return "Repos";
    },
    monday_type: function () { return this.mondayType;},
});

Template.Plan.events({
    "click #delete_btn" : function (e,t) {
        Meteor.call("removePlan", t.find(".plid").innerHTML);
        document.location = "/plans";
    }
});
