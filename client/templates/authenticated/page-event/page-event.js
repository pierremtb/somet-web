Template.Event.onCreated(function () {
  ev = new ReactiveVar();
  isEdit = new ReactiveVar();
  isNew = new ReactiveVar();
  isEditableEvent= new ReactiveVar();
  Tracker.autorun(() => {
    FlowRouter.watchPathChange();
    isEdit.set((FlowRouter.current().path.indexOf('/event') != -1 && FlowRouter.current().path.indexOf('/edit') != -1));
    isNew.set(FlowRouter.current().path == '/event/new');
    isEditableEvent.set(isNew.get() || isEdit.get());
  });
});

Template.Event.onRendered(function () {
  Tracker.autorun(() => {
    if (GoogleMaps.loaded()) {
      $("#event_place").geocomplete();
    }
  });
  var done = false;
  Tracker.autorun(() => {
    if (FlowRouter.subsReady() && !done) {
      ev.set(EventsDB.findOne());
      done = true;
    }

    if (isEdit.get()) {
      $('#event_class').val(ev.get().class);
    }
    $('#event_class').material_select();
    $('.datepicker').pickadate({
      selectMonths: true,
      selectYears: 15,
      today: 'auj.',
      clear: 'effacer',
      firstDay: 1
    });
  });
});

Template.Event.helpers({
  event() {
    console.log(ev.get());
    return ev.get();
  },
  over() {
    return ev.get().date < new Date();
  },
  overAndResult() {
    return ev.get().date < new Date() && ev.get().result;
  },
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
  },
  isEditableEvent() {
    return isEditableEvent.get()
  },
  isNew() {
    return isNew.get();
  },
  isEdit() {
    return isEdit.get();
  }
});

Template.Event.events({
  "click #delete_bt": (e, t) =>{
    Meteor.call("rmThisEv", t.find("#evid").innerHTML);
    document.location = "/events";
  },
  'click #edit_event': (e, t) =>{
    FlowRouter.go('/event/' + ev.get()._id + '/edit');
    FlowRouter.reload();
  },
  'click #save_new_event': (e, t) =>{
    console.log("nsrtaintui");
    if (isNew.get()) {
      Meteor.call("insertEvent", {
        owner: Meteor.user().profile.trainer ? Session.get("selectedAthlete") : Meteor.user().username,
        name: t.find("#event_name").value,
        date: new Date(t.find("#event_date").value),
        description: t.find("#event_description").value,
        place: t.find("#event_place").value,
        goal: t.find("#event_goal").value,
        class: t.find("#event_class").value
      }, function (e, r) {
        if (e)
          Materialize.toast("L'événement n'a pas pu être ajouté", 1000);
        else
          FlowRouter.go('/events');
      });
    } else {
      Meteor.call('updateEvent', ev.get()._id , {
        owner: Meteor.user().profile.trainer ? Session.get("selectedAthlete") : Meteor.user().username,
        name: t.find("#event_name").value,
        date: new Date(t.find("#event_date").value),
        description: t.find("#event_description").value,
        place: t.find("#event_place").value,
        goal: t.find("#event_goal").value,
        class: t.find("#event_class").value
      }, function (e, r) {
        if (e)
          Materialize.toast("L'événement n'a pas pu être modifié", 1000);
        else {
          FlowRouter.redirect('/event/' + ev.get()._id);
        }
      });
    }
  }
});
