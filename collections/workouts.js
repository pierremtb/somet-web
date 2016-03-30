WorkoutsDB = new Meteor.Collection('workouts');

WorkoutsDB.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

WorkoutsDB.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

let WorkoutsDBSchema = new SimpleSchema({
  "owner": {
    type: String,
    label: "The username of the owner of this workout."
  },
  "title": {
    type: String,
    label: "The title of this workout."
  },
  "description": {
    type: String,
    label: "The description of this workout.",
    optional: true
  },
  "comments": {
    type: String,
    label: "The comments of this workout.",
    optional: true
  },
  "start_date": {
    type: Date,
    label: "The starting date of this workout."
  },
  "duration": {
    type: Number,
    label: "The duration in seconds of this workout."
  },
  "distance": {
    type: Number,
    label: "The distance in meters of this workout.",
    decimal: true
  },
  "support": {
    type: String,
    label: "The code of the support of this workout."
  },
  "cr": {
    type: Object,
    label: "The CR scales of this workout.",
    optional: true
  },
  "fit_linked": {
    type: Boolean,
    label: "Wether there is a FIT file linked to this workout."
  },
  "fit_values": {
    type: Object,
    label: "The FIT-related object linked to this workout, with different values and time in seconds..",
    optional: true
  },
  "speed": {
    type: Object,
    label: "The speed object of this workout.",
    optional: true
  },
  "power": {
    type: Object,
    label: "The power object of this workout.",
    optional: true
  },
  "cadence": {
    type: Object,
    label: "The cadence object of this workout.",
    optional: true
  },
  "ascent": {
    type: Number,
    label: "The total ascent during this workout.",
    optional: true,
    decimal: true
  },
  "descent": {
    type: Number,
    label: "The total descent during this workout.",
    optional: true,
    decimal: true
  },
  "calories": {
    type: Number,
    label: "The calories consumed during this workout.",
    optional: true
  },
  "strava_id": {
    type: Number,
    label: "The Strava ID related to this workout.",
    optional: true
  }
});

WorkoutsDB.attachSchema(WorkoutsDBSchema);

TabularTables.Workouts = new Tabular.Table({
  name: "Workouts",
  collection: WorkoutsDB,
  columns: [
    {data: "title", title: "Title"},
    {data: "start_date", title: "Date"},
    {data: "distance", title: "Distance (m)"},
    {data: "duration", title: "Durée (sec)"},
  ],
  responsive: true,
  autoWidth: false
});
