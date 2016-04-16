Meteor.users.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Meteor.users.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

UsersIndex = new EasySearch.Index({
  collection: Meteor.users,
  fields: ['username','profile.complete_name'],
  engine: new EasySearch.Minimongo()
});
