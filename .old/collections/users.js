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

AthletesIndex = new EasySearch.Index({
  collection: Meteor.users,
  fields: ['username','profile.complete_name', 'profile.trainer'],
  name: 'athletesIndex',
  defaultSearchOptions: {limit: 8},
  engine: new EasySearch.Minimongo({
    selector: function (searchObject, options, aggregation) {
      let selector = this.defaultConfiguration().selector(searchObject, options, aggregation);
      selector["profile.trainer"] = false;
      return selector;
    }
  })
});

TrainersIndex = new EasySearch.Index({
  collection: Meteor.users,
  fields: ['username','profile.complete_name', 'profile.trainer'],
  name: 'trainersIndex',
  defaultSearchOptions: {limit: 8},
  engine: new EasySearch.Minimongo({
    selector: function (searchObject, options, aggregation) {
      let selector = this.defaultConfiguration().selector(searchObject, options, aggregation);
      selector["profile.trainer"] = true;
      return selector;
    }
  })
});
