Meteor.methods({
  insertNotification( argument ) {
    check( argument, NotificationsDBSchema );

    try {
      var documentId = Collection.insert( argument );
      return documentId;
    } catch( exception ) {
      return exception;
    }
  },
  sendAthleteInvite: function (usr, me) {
    check(usr, String);
    check(me, String);
    if (NotificationsDB.findOne({
        username: usr,
        read: false,
        trainerconfirmationtype: true,
        value: me
      }) === undefined) {
      NotificationsDB.insert({owner: usr, read: false, type: "invite_for_athlete", value: me, date: new Date()});
      return "Une invitation a été envoyée à " + usr + ".";
    }
    else
      return "Cette invitation a déjà été envoyée.";
  },
  sendTrainerInvite: function (usr, me) {
    check(usr, String);
    check(me, String);
    if (NotificationsDB.findOne({
        owner: usr,
        read: false,
        type: "invite_for_trainer",
        value: me
      }) === undefined) {
      NotificationsDB.insert({owner: usr, read: false, type: "invite_for_trainer", value: me, date: new Date()});
      return "Une invitation a été envoyée à " + usr + ".";
    }
    else
      return "Cette invitation a déjà été envoyée.";
  },
  declineNotification: function (id) {
    check(id, String);
    NotificationsDB.update(id, {$set: {read: true}});
  }
});
