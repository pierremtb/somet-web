TrainersDB = new Meteor.Collection( 'trainers' );

TrainersDB.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

TrainersDB.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

let TrainersDBSchema = new SimpleSchema({
  "username": {
    type: String,
    label: "The username of the trainer."
  },
  "complete_name": {
    type: String,
    label: "The complete name of the trainer",
    optional: true
  }
});

TrainersDB.attachSchema( TrainersDBSchema );

TrainersDBIndex = new EasySearch.Index({
  collection: TrainersDB,
  fields: ['username','complete_name'],
  engine: new EasySearch.Minimongo()
});
