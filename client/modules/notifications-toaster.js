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
    Materialize.toast(_generateMessage(notifications[i].type, notifications[i].value));
  }
};

let _generateMessage = (type, value) => {
  switch(type) {
    case "trainer_confirmation":
          return "@" + value + " est désormais votre entraineur !";
    case "athlete_confirmation":
          return "Vous entrainez désormais l'athlete @" + value;
    case "invite_for_trainer":
          return "L'athlete @" + value + " veut que vous deveniez son entraineur";
    case "invite_for_athlete":
          return "@" + value + " veut devenir votre entraineur";
  }
};

Modules.client.notificationsToaster = notificationsToaster;
