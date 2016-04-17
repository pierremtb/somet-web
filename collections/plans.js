PlansDB = new Meteor.Collection( 'plans' );

PlansDB.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

PlansDB.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

let PlansDBSchema = new SimpleSchema({
  "owner": {
    type: String,
    label: "The username of the athlete concerned by this plan."
  },
  "title": {
    type: String,
    label: "The title of this plan."
  },
  "monday_date": {
    type: Date,
    label: "The date of the monday of this plan."
  },
  "total_duration": {
    type: Number,
    label: "The total duration of the week workouts in seconds, in this plan."
  },
  "days": {
    type: [Object],
    minCount: 7,
    maxCount: 7
  },
  "days.$.type": {
    type: String
  },
  "days.$.description": {
    type: String,
    optional: true
  },
  "days.$.support": {
    type: String,
    optional: true
  },
  "days.$.duration": {
    type: Number,
    optional: true
  },
  "days.$.event_id": {
    type: String,
    optional: true
  }
});

PlansDB.attachSchema( PlansDBSchema );

TabularTables.Plans = new Tabular.Table({
  name: "Plans",
  collection: PlansDB,
  columns: [
    {data: "title", title: "Title"},
    {data: "monday_date", title: "Date de début"},
    {data: "total_duration", title: "Durée totale (s)"},
  ],
  order: [[1, 'desc']],
  responsive: true,
  autoWidth: false
});
