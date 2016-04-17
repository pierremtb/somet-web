Template.Plan.onCreated(function () {
  isEdit = new ReactiveVar((FlowRouter.current().path.indexOf('/plan') != -1 && FlowRouter.current().path.indexOf('/edit') != -1));
  isNew = new ReactiveVar(FlowRouter.current().path == '/plan/new');
  isEditablePlan = new ReactiveVar(isNew.get() || isEdit.get());
  pl = new ReactiveVar({});
});

function setIfEdit() {
  if (isEdit.get()) {
    console.log(pl.get());
    for (let i in pl.get().days) {
      Session.set('day_' + i + '_type', pl.get().days[i].type);
      Session.set('day_' + i + '_support', pl.get().days[i].support);
      Session.set('day_' + i + '_duration', pl.get().days[i].duration);
      Session.set('day_' + i + '_description', pl.get().days[i].description);
    }
    Session.set('pl_title', pl.get().title);
    Session.set('pl_monday_date', pl.get().monday_date);
    Session.set('pl_id', pl.get()._id);
    Session.set('pl_owner', pl.get()._id);
    Session.set('pl_total_duration', pl.get().total_duration);
  }
}

Template.Plan.onRendered(function () {
  console.log(isEdit.get());
  console.log(isEditablePlan.get());
  if (!isNew.get()) {
    var done = false;
    Tracker.autorun(function () {
      if (FlowRouter.subsReady() && !done) {
        if (PlansDB.findOne()) {
          pl.set(PlansDB.findOne());
          setIfEdit();
          console.log(pl.get());
          done = true;
        } else {
          //FlowRouter.redirect('/dashboard');
        }
      }
    });
  }
});

Template.Plan.helpers({
  sessionMondayDate() {
    console.log(Session.get('pl_monday_date'));
    return moment(Session.get('pl_monday_date')).format('LL');
  },
  sessionTitle() {
    return Session.get('pl_title');
  },
  title() {
    return pl.get().title
  },
  _id() {
    return pl.get()._id
  },
  days() {
    return pl.get().days
  },
  daysOfWeek() {
    return [0, 1, 2, 3, 4, 5, 6]
  },
  monday_date() {
    return pl.get().monday_date
  },
  monday_support() {
    return this.monday_support
  },
  mondayType: function () {
    if (this.monday_type == "wk")
      return "Entrainement";
    else if (this.monday_type == "rc")
      return "Compétition";
    else if (this.monday_type == "nth")
      return "Repos";
  },
  monday_type: function () {
    return this.mondayType;
  },
  isEditablePlan() {
    return isEditablePlan.get()
  },
  isNew() {
    return isNew.get();
  },
  isEdit() {
    return isEdit.get();
  }
});

Template.Plan.events({
  "click #delete_btn": function (e, t) {
    Meteor.call("removePlan", t.find(".plid").innerHTML);
    document.location = "/plans";
  },
  'click #save_new_plan': function (event, t) {
    let days = [];
    for(let i = 0; i < 7; i++) {
      days.push({
        type: Session.get("day_" + i + "_type") ? Session.get("day_" + i + "_type") : "nth",
        description: Session.get('day_' + i + '_type') && Session.get('day_' + i + '_type') != "nth" ? Session.get('day_' + i + '_description') : '',
        duration: Session.get('day_' + i  + '_type') == "wk" ? Session.get('day_' + i  + '_duration') : '',
        support: Session.get('day_' + i + '_type') && Session.get('day_' + i + '_type') != "nth" ? Session.get('day_' + i + '_support') : ''
      });
    }
    if(FlowRouter.current().path.indexOf(Session.get('pl_id')) != -1) {
      let obj = {
        owner: Session.get("selectedAthlete"),
        title: t.find('#description').value,
        monday_date: new Date(t.find('#monday_date').value),
        total_duration: parseInt(Session.get("pl_total_duration")),
        days: days
      };
      Meteor.call("updatePlan", Session.get('pl_id'), obj);
      console.log(obj);
    }
     /*else {
      /*Meteor.call("insertPlan", {
        owner: Session.get("selectedAthlete"),
        title: t.find('#description').value,
        monday_date: new Date(t.find('#monday_date').value),
        total_duration: parseInt(Session.get("total_duration")),
        days: days
      });
      Meteor.call("sendPush", Meteor.user().username, Session.get("selectedAthlete"), "Nouveau plan", "Un nouveau plan vous a été ajouté!");
    }
    FlowRouter.go('/plans');*/
  },
  'click #edit_plan': function(e,t) {
    FlowRouter.go(FlowRouter.current().path +  '/edit');
  }
});
