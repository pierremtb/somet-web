AthletesDB = new Meteor.Collection( 'athletes' );

AthletesDB.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

AthletesDB.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

let AthletesDBSchema = new SimpleSchema({
  "username": {
    type: String,
    label: "The username of the athlete."
  },
  "trainer": {
    type: String,
    label: "The username of the trainer of this trainer.",
    optional: true
  },
  "complete_name": {
    type: String,
    label: "The complete name of the athlete.",
    optional: true
  }
});

AthletesDB.attachSchema( AthletesDBSchema );

AthletesDBIndex = new EasySearch.Index({
  collection: AthletesDB,
  fields: ['username','complete_name'],
  engine: new EasySearch.Minimongo()
});
