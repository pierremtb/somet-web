NotificationsDB = new Meteor.Collection( 'notifications' );

NotificationsDB.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

NotificationsDB.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

let NotificationsDBSchema = new SimpleSchema({
  "owner": {
    type: String,
    label: "The username of the owner of this notification."
  },
  "read": {
    type: Boolean,
    label: "Wether it is read or not."
  },
  "type": {
    type: String,
    label: "The type of this notification."
  },
  "value": {
    type: String,
    label: "The value of this notification."
  },
  "date": {
    type: Date,
    label: "The date of creation of this notification."
  }
});

NotificationsDB.attachSchema( NotificationsDBSchema );
