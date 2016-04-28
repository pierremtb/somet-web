



Meteor.publish('allUsersSync', function() {
  return Meteor.users.find();
});

Meteor.publish('mainUserDataSync', function() {
  let usr = Meteor.users.findOne({_id: this.userId});
  if(usr.profile.trainer) {
    return [
      Meteor.users.find(),
      WorkoutsDB.find({owner: {$in: usr.profile.my_athletes}}, {fields: {fit_values: false}}),
      PlansDB.find({owner: {$in: usr.profile.my_athletes}}),
      EventsDB.find({owner: {$in: usr.profile.my_athletes}}),
      NotificationsDB.find({owner: usr.username})
    ];
  } else {
    return [
      Meteor.users.find(),
      WorkoutsDB.find({owner: usr.username}, {fields: {fit_values: false}}),
      PlansDB.find({owner: usr.username}),
      EventsDB.find({owner: usr.username}),
      NotificationsDB.find({owner: usr.username})
    ];
  }
});

Meteor.publish('workoutOfThisIdSync', function (id) {
  return WorkoutsDB.findOne(id);
});
