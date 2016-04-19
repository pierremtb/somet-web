Template.Profile.onCreated(function () {
  user_id = new ReactiveVar();
});

Template.Profile.onRendered(function () {
  Tracker.autorun(function() {
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
  }
});
