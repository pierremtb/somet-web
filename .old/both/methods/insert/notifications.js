Meteor.methods({
  sendAthleteInvite(usr, me) {
    check(usr, String);
    check(me, String);

    if (NotificationsDB.findOne({username: usr, read: false, trainerconfirmationtype: true, value: me}))
      throw new Meteor.Error("Cette invitation a déjà été envoyée");


    NotificationsDB.insert({
      owner: usr,
      read: false,
      type: "invite_for_athlete",
      value: me,
      date: new Date()
    }, (e) => {
      if (e) throw e;
    });

    return "Une invitation a été envoyée à " + usr + ".";
  },
  sendTrainerInvite(usr, me) {
    check(usr, String);
    check(me, String);

    if (NotificationsDB.findOne({owner: usr, read: false, type: "invite_for_trainer", value: me }))
      throw new Meteor.Error("Cette invitation a déjà été envoyée");

    NotificationsDB.insert({
      owner: usr,
      read: false,
      type: "invite_for_trainer",
      value: me,
      date: new Date()
    }, (e) => {
      if (e) throw e;
    });

    return "Une invitation a été envoyée à " + usr + ".";
  },
  declineNotification(id) {
    check(id, String);

    NotificationsDB.update(id, {$set: {read: true}}, (e) => {
      if (e) throw e;
    });
  }
});
