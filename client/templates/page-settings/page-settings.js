var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

Template.Settings.helpers({
    isTrainer: function () { return Meteor.user().profile === "trainer";}
});

Template.Settings.events({
});

Template.Settings.onRendered(function() {
});
