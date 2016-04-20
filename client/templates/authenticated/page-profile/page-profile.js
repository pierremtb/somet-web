Template.Profile.onCreated(function () {
  user_id = new ReactiveVar();
});

Template.Profile.onRendered(function () {
  Tracker.autorun(() => {
    FlowRouter.watchPathChange();
    $('.modal-trigger').leanModal();
    user_id.set(FlowRouter.current().params.id);
    Session.set('current_path', FlowRouter.current().path);
  });
});

Template.Profile.helpers({
  isMe: () => Meteor.userId() == user_id.get(),
  isMyTrainer: () => Meteor.user().profile.my_trainer == Meteor.users.findOne(user_id.get()).username,
  isOneOfMyAthlete: () => Meteor.user().profile.my_athletes.indexOf(Meteor.users.findOne(user_id.get()).username) != -1,
  user: () => Meteor.users.findOne(user_id.get())
});

Template.Profile.events({
  'click #logout': () => {
    Meteor.logout(function (e) {
      FlowRouter.go('/settings');
      FlowRouter.redirect('/login');
    });
  },
  "click #new_complete_name_submit, submit #form_new_complete_name": (e, t) =>{
    e.preventDefault();
    $(t.find('#change_complete_name')).closeModal();
    Meteor.call("updateThisUser", Meteor.userId(), {
      "profile.complete_name" : t.find("#new_complete_name").value
      }, (e) => {
      if(e) Materialize.toast(e,1000);
    });
  },
  "click #n_weight_submit, submit #form_new_weight": (e, t) =>{
    e.preventDefault();
    $(t.find('#change_weight')).closeModal();
    Meteor.call("updateThisUser", Meteor.userId(), {
      "profile.weight" : t.find("#new_weight").value
    }, (e) => {
      if(e) Materialize.toast(e,1000);
    });
  },
  "click #n_height_submit, submit #form_new_height": (e, t) =>{
    e.preventDefault();
    $(t.find('#change_height')).closeModal();
    Meteor.call("updateThisUser", Meteor.userId(), {
      "profile.height" : t.find("#new_height").value
    }, (e) => {
      if(e) Materialize.toast(e,1000);
    });
  },
  "click #n_pwd_submit, submit #form_new_pwd": (e, t) => {
    e.preventDefault();
    $(t.find('#change_pwd')).closeModal();
    Meteor.call("setThisUserPassword", Meteor.userId(), t.find("#new_pwd").value, (e) => {
      if(e) Materialize.toast(e,1000);
    });
  }
});
