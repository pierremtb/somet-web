Meteor.methods({
  updateThisUser(id, arg) {
    check(id, String);
    check(arg, Object);

    Meteor.users.update(id, {$set : arg});
  },
  setTrainerOfThisAthlete(usr, id) {
    check(id, String);
    check(usr, String);

    Meteor.users.update(
      Meteor.users.findOne({username: usr})._id,
      {$addToSet:
        {"profile.my_athletes" : Meteor.users.findOne(id).username}
      }
    );

    Meteor.users.update(
      id,
      {$set:
        {"profile.my_trainer": usr}
      }
    );
  },
  addAthleteToThisTrainer(usr, id) {
    check(id, String);
    check(usr, String);

    Meteor.users.update(id, {$addToSet: {"profile.my_athletes" : usr}});
    Meteor.users.update(
      Meteor.users.findOne({username: usr})._id,
      {$set: 
        {"profile.my_trainer": Meteor.users.findOne(id).username}
      });
  },
  removeAthleteFromThisTrainer(usr, id) {
    check(id, String);
    check(usr, String);

    Meteor.users.update(id, {pull: {"profile.my_athletes" : usr}});
    Meteor.users.update(
      Meteor.users.findOne({username: usr})._id,
      {$set:
        {"profile.my_trainer": ""}
      });
  }
});
