var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

Template.Settings.helpers({
  isTrainer() {
    return Meteor.user().profile === "trainer";
  },
  athletes() {
    return Meteor.user().profile.my_athletes;
  },
  myName() {
    return Meteor.user().profile.complete_name;
  },
  trainer() {
    return Meteor.user().profile.my_trainer;
  }
});

Template.Settings.events({
  "click .strava": function (e, t) {
    Meteor.loginWithStrava({}, function (err) {
      if (err) {
        throw new Meteor.Error("Facebook login failed");
      }
    });
  },
  "click #n_name_submit": function (e, t) {
    if(Meteor.user().profile === "trainer")
      Meteor.call("changeTrainerName", Meteor.user().username, t.find("#new_complete_name").value);
    else
      Meteor.call("changeAthleteName", Meteor.user().username, t.find("#new_complete_name").value);
  },
  "click #n_weight_submit": function (e, t) {
    Meteor.call("updateThisUser", Meteor.userId(), {"profile.weight" : parseFloat(t.find("#new_weight").value)});
  },
  "click #n_height_submit": function (e, t) {
    Meteor.call("updateThisUser", Meteor.userId(), {"profile.height" : parseFloat(t.find("#new_height").value)});
  },
  "click #n_pwd_submit": function (e, t) {
    console.log(t.find("#new_pwd").value);
    Meteor.call("setThisUserPassword", Meteor.userId(), t.find("#new_pwd").value);
  }
});

Template.Settings.onRendered(function () {
  $('.modal-trigger').leanModal();
});

Template.Settings.onCreated(function() {
  this.subscribe('getUserData');
  this.subscribe('allUsers');
});
