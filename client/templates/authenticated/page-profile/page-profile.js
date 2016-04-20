Template.Profile.onCreated(function () {
  user_id = new ReactiveVar();
});

Template.Profile.onRendered(function () {
  Tracker.autorun(() => {
    FlowRouter.watchPathChange();
    user_id.set(FlowRouter.current().params.id);
    Session.set('current_path', FlowRouter.current().path);
  });
});

Template.Profile.helpers({
  isMe: () => Meteor.userId() == user_id.get(),
  user: () => Meteor.users.findOne(user_id.get())
});

Template.Profile.events({
  'click #logout': () => {
    Meteor.logout(function (e) {
      FlowRouter.go('/settings');
      FlowRouter.redirect('/login');
    });
  },
  "click #n_name_submit": (e, t) =>{
    if(Meteor.user().profile === "trainer")
      Meteor.call("changeTrainerName", Meteor.user().username, t.find("#new_complete_name").value);
    else
      Meteor.call("changeAthleteName", Meteor.user().username, t.find("#new_complete_name").value);
  },
  "click #n_weight_submit": (e, t) =>{
    Meteor.call("updateThisUser", Meteor.userId(), {"profile.weight" : parseFloat(t.find("#new_weight").value)});
  },
  "click #n_height_submit": (e, t) =>{
    Meteor.call("updateThisUser", Meteor.userId(), {"profile.height" : parseFloat(t.find("#new_height").value)});
  },
  "click #n_pwd_submit": (e, t) => {
    Meteor.call("setThisUserPassword", Meteor.userId(), t.find("#new_pwd").value);
  }
});
