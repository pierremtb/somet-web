EventsDB = new Meteor.Collection('events');

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
  "name": {
    type: String,
    label: "The name of the event."
  },
  "date": {
    type: Date,
    label: "The date of the event."
  },
  "place": {
    type: String,
    label: "The place of the event."
  },
  "goal": {
    type: String,
    label: "The goal of the event.",
    optional: true
  },
  "description": {
    type: String,
    label: "The description of the event.",
    optional: true
  },
  "class": {
    type: String,
    allowedValues: ['first', 'second', 'preparation'],
    label: "Wether it's a first class event, or a pr."
  }
});

EventsDB.attachSchema(EventsDBSchema);

TabularTables.Events = new Tabular.Table({
  name: "Events",
  collection: EventsDB,
  columns: [
    {data: "name", title: "Nom"},
    {data: "date", title: "Date"},
    {data: "class", title: "Classe"},
  ],
  responsive: true,
  order: [[2, 'desc']],
  autoWidth: false
});
