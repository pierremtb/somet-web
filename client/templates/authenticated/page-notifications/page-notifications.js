Template.Notifications.onCreated(function () {
  Session.set('display_read_notifications', false);
});

Template.Notifications.onRendered(function () {});

Template.Notifications.helpers({
  notificationsSpeaker() {
    let n = NotificationsDB.find({owner: Meteor.user().username, read: false}).count() > 0;
    if(n) {
      return `Vous avez ${n} notifications non lues`;
    } else {
      return 'Pas de notifications non lues.';
    }
  },
  notificationsToDisplay() {
    return NotificationsDB.findOne({read: Session.get('display_read_notifications')}, {sort: {date:-1}}) ? NotificationsDB.find({read: Session.get('display_read_notifications')}, {sort: {date:-1}}) : false;
  }
});

Template.Notifications.events({
  'click #toogle_read_notifications': () => {
    Session.set('display_read_notifications', !Session.get('display_read_notifications'));
  }
});
