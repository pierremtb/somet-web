Template.Plan.onCreated(function () {
  this.subscribe("upcomingEventsOfUsr", Session.get('selectedAthlete'));

  pl = new ReactiveVar({});
  isEdit = new ReactiveVar();
  isNew = new ReactiveVar();
  isEditablePlan = new ReactiveVar();

  Tracker.autorun(() => {
    FlowRouter.watchPathChange();
    isEdit.set(FlowRouter.current().path.indexOf('/plan') != -1 && FlowRouter.current().path.indexOf('/edit') != -1);
    isNew.set(FlowRouter.current().path == "/plan/new");
    isEditablePlan.set(isNew.get() || isEdit.get());
  });
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

  for(let i=0;i<7;i++) {
    Session.set(`day_${i}_duration`, 0);
    Session.set(`day_${i}_type`, 0);
    Session.set(`day_${i}_support`, 0);
    Session.set(`day_${i}_duration`, 0);
    Session.set(`day_${i}_description`, '');
  }

  let count = 0;
  if (!isNew.get()) {
    Tracker.autorun(() => {
      if (FlowRouter.subsReady() && count < 20) {
        if (PlansDB.findOne()) {
          pl.set(PlansDB.findOne());
          count++;
          setIfEdit();
          $('.datepicker').val(pl.get().monday_date.toJSON()).pickadate();
        }
      }
    });
  }
});


Template.Plan.helpers({
  sessionMondayDate() {
    return pl.get().monday_date;
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
  totalDuration() {
    let td = 0;
    if(isEditablePlan.get()) {
      for (let i = 0; i < 7; i++) {
        if (Session.get(`day_${i}_duration`))
          td += parseInt(Session.get(`day_${i}_duration`));
      }
      Session.set('pl_total_duration', td);
    } else {
      for (let i in pl.get().days) {
        if (pl.get().days[i].duration)
          td += parseInt(pl.get().days[i].duration);
      }
    }
    return td;
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
  mondayType: () => {
    if (this.monday_type == "wk")
      return "Entrainement";
    else if (this.monday_type == "rc")
      return "Compétition";
    else if (this.monday_type == "nth")
      return "Repos";
  },
  monday_type: () => {
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
  "click #delete_btn": (e, t) =>{
    Meteor.call("removePlan", pl.get()._id);
    FlowRouter.go("/plans");
  },
  'click #save_new_plan': function (event, t) {
    let days = [];
    for(let i = 0; i < 7; i++) {
      if(Session.get("day_" + i + "_type") == 'wk') {
        days.push({
          type: "wk",
          description: Session.get('day_' + i + '_description'),
          duration: Session.get('day_' + i + '_duration'),
          support: Session.get('day_' + i + '_support')
        });
      } else if (Session.get("day_" + i + "_type") == 'rc'){
        days.push({
          type: 'rc',
          event_id: Session.get('day_' + i + '_event_id')
        })
      } else {
        days.push({
          type: 'nth'
        })
      }
    }
    console.log(days);
    if(FlowRouter.current().path.indexOf(Session.get('pl_id')) != -1) {
      let obj = {
        owner: Session.get("selectedAthlete"),
        title: t.find('#description').value,
        total_duration: parseInt(Session.get("pl_total_duration")),
        days: days
      };
      Meteor.call("updatePlan", Session.get('pl_id'), obj);
    }
     else {
      Meteor.call("insertPlan", {
        owner: Session.get("selectedAthlete"),
        title: t.find('#description').value,
        monday_date: new Date(t.find('#monday_date').value),
        total_duration: parseInt(Session.get("pl_total_duration")),
        days: days
      });
      Meteor.call("sendPush", Meteor.user().username, Session.get("selectedAthlete"), "Nouveau plan", "Un nouveau plan vous a été ajouté!");
    }
    FlowRouter.go('/plans');
  },
  'click #edit_plan': function(e,t) {
    isEdit.set(true);
    FlowRouter.go(FlowRouter.current().path +  '/edit');
  },
  'change #monday_date': function(e,t) {
    Session.set('pl_monday_date', new Date(e.target.value));
  }
});
