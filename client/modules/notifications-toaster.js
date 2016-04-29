const notificationsToaster = () => {
  _getNewNotifications();
};

let _getNewNotifications = () => {
  Meteor.call("getNotifications",{owner: Meteor.user().username, read: false}, function(e,r) {
    _toast(r);
  })
};

let _toast = (notifications) => {
  for(let i in notifications) {
    Materialize.toast(_generateMessage(notifications[i].type, notifications[i].value), 1000);
  }
};

let _generateMessage = (type, value) => {
  return Blaze._globalHelpers.dispNotificationText(type, value);
};

Modules.client.notificationsToaster = notificationsToaster;
