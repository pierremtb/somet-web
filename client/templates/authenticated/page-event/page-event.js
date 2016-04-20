Template.Event.onCreated(function () {
  ev = new ReactiveVar();
  isEdit = new ReactiveVar();
  isNew = new ReactiveVar();
  isEditableEvent = new ReactiveVar();
  Tracker.autorun(() => {
    FlowRouter.watchPathChange();
    isEdit.set((FlowRouter.current().path.indexOf('/event') != -1 && FlowRouter.current().path.indexOf('/edit') != -1));
    isNew.set(FlowRouter.current().path == '/event/new');
    isEditableEvent.set(isNew.get() || isEdit.get());
  });
});

Template.Event.onRendered(function () {
  $(this.find('.modal-trigger')).leanModal();

  Tracker.autorun(() => {
    if (GoogleMaps.loaded()) {
      $(this.find('#event_place')).geocomplete();
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
  event: () => ev.get(),
  over: () => ev.get().date < new Date(),
  overAndResult: () => ev.get().date < new Date() && ev.get().result,
  isEditableEvent: () =>isEditableEvent.get(),
  isNew: () => isNew.get(),
  isEdit: () => isEdit.get()
});

Template.Event.events({
  "click #delete_bt": (e, t) => {
    Meteor.call("removeEvent", ev.get()._id);
    FlowRouter.go("/events");
  },
  'click #edit_event': (e, t) => {
    FlowRouter.go('/event/' + ev.get()._id + '/edit');
  },
  'click #save_new_event': (e, t) => {
    let doc = {
      owner: Meteor.user().profile.trainer ? Session.get("selectedAthlete") : Meteor.user().username,
      name: t.find("#event_name").value,
      date: new Date(t.find("#event_date").value),
      description: t.find("#event_description").value,
      place: t.find("#event_place").value,
      goal: t.find("#event_goal").value,
      class: t.find("#event_class").value
    };
    if (isNew.get()) {
      Meteor.call("insertEvent", doc, (e) => {
        if (e) Materialize.toast(e, 1000);
        else FlowRouter.go('/events');
      });
    } else {
      Meteor.call('updateEvent', ev.get()._id, doc, (e) => {
        if (e) Materialize.toast(e, 1000);
        else FlowRouter.go('/events');
      });
    }
  }
});
