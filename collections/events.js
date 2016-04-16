EventsDB = new Meteor.Collection( 'events' );

EventsDB.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

EventsDB.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

let EventsDBSchema = new SimpleSchema({
  "owner": {
    type: String,
    label: "The username of the athlete that owns this event."
  },
  "title": {
    type: String,
    label: "The title of the event."
  },
  "date": {
    type: Date,
    label: "The date of the event."
  },
  "description": {
    type: String,
    label: "The description of the event.",
    optional: true
  },
  "first_class_event": {
    type: Boolean,
    label: "Wether it's a first class event."
  },
  "second_class_event": {
    type: Boolean,
    label: "Wether it's a second class event."
  },
  "preparation_event": {
    type: Boolean,
    label: "Wether it's a preparation event."
  }
});

EventsDB.attachSchema( EventsDBSchema );

TabularTables.Events = new Tabular.Table({
  name: "Events",
  collection: EventsDB,
  columns: [
    {data: "title", title: "Title"},
    {data: "comments", title: "Commentaires"},
    {data: "date", title: "Date"}
  ],
  responsive: true,
  order: [[2, 'desc']],
  autoWidth: false
});
