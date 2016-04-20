Meteor.methods({
  updateThisUser(id, arg) {
    check(id, String);
    check(arg, Object);

    Meteor.users.update(id, {$set : arg}, (e) => {
      if (e) throw e;
    });
  },
  setTrainerOfThisAthlete(usr, id) {
    check(id, String);
    check(usr, String);

    Meteor.users.update(
      Meteor.users.findOne({username: usr})._id,
      {$addToSet:
        {"profile.my_athletes" : Meteor.users.findOne(id).username}
      },(e) => {
        if (e) throw e;
    });

    Meteor.users.update(
      id,
      {$set:
        {"profile.my_trainer": usr}
      }, (e) => {
        if (e) throw e;
    });
  },
  addAthleteToThisTrainer(usr, id) {
    check(id, String);
    check(usr, String);

    Meteor.users.update(id, {$addToSet: {"profile.my_athletes" : usr}}, (e) => {
      if (e) throw e;
    });
    Meteor.users.update(
      Meteor.users.findOne({username: usr})._id,
      {$set: 
        {"profile.my_trainer": Meteor.users.findOne(id).username}
      }, (e) => {
        if (e) throw e;
    });
  },
  removeAthleteFromThisTrainer(usr, id) {
    check(id, String);
    check(usr, String);

    Meteor.users.update(id, {pull: {"profile.my_athletes" : usr}}, (e) => {
      if (e) throw e;
    });
    Meteor.users.update(
      Meteor.users.findOne({username: usr})._id,
      {$set:
        {"profile.my_trainer": ""}
      }, (e) => {
        if (e) throw e;
    });
  }
});
