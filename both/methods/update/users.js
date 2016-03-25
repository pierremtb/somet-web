Meteor.methods({
  updateThisUser(id, arg) {
    check(id, String);
    check(arg, Object);

    Meteor.users.update(id, {$set : arg});
  }
});
