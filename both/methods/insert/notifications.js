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
      NotificationsDB.insert({owner: usr, read: false, type: "invite_for_athlete", value: me});
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
      NotificationsDB.insert({owner: usr, read: false, type: "invite_for_trainer", value: me});
      return "Une invitation a été envoyée à " + usr + ".";
    }
    else
      return "Cette invitation a déjà été envoyée.";
  },
  acceptTrainer: function (t, a, id) {
    check(t, String);
    check(a, String);
    check(id, String);
    console.log('yeah');
    var tt = AthletesDB.findOne({username: a})._id;
    AthletesDB.update(tt, {$set: {trainer: t}});
    NotificationsDB.insert({owner: t, read: false, type: "athlete_confirmation", value: a});
    NotificationsDB.update(id, {$set: {read: true}});
    return "L'entraineur " + t + " vous a été ajouté";
  },
  acceptAthlete: function (a, t, id) {
    check(a, String);
    check(t, String);
    check(id, String);
    console.log(a,t,id);
    var tt = AthletesDB.findOne({username: a})._id;
    AthletesDB.update(tt, {$set: {trainer: t}});
    NotificationsDB.insert({owner: a, read: false, type: "trainer_confirmation", value: t});
    NotificationsDB.update(id, {$set: {read: true}});
    return "L'athlete " + a + " vous a ajouté.";
  },
  declineNotification: function (id) {
    check(id, String);
    NotificationsDB.update(id, {$set: {read: true}});
  }
});
