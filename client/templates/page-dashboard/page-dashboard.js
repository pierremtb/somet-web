Template.Dashboard.helpers({
    workouts: function () {
      return WorkoutsDB.find({}, {sort: {date: -1}, limit:1});
    },
    athletes: function () {
      return AthletesDB.find({trainer: Meteor.user().username});
    },
    trainers: function () {
      return AthletesDB.find({username: Meteor.user().username});
    },
    allathletes: function () {
      return AthletesDB.find({});
    },
    alltrainers: function () {
      return TrainersDB.find({});
    },
    trainerIs: function(){ 
        if(Meteor.user().profile === "trainer") 
            return true; 
        else 
            return false;
    },
    trainerIsMe: function() {
        console.log(this.trainer);
        if(this.trainer == Meteor.user())
            return true;
        else
            return false;
        }
  });

Template.Dashboard.events({
    "click .add_athlete_button": function () {
        NotificationsDB.insert({username: this.username, read: false, trainerconfirmationtype:true, value: Meteor.user().username});
        Materialize.toast("Une invitation a été envoyée à " + this.username + ".", 1000);
    },
    "click .add_trainer_button": function () {
        NotificationsDB.insert({username: this.username, read: false, athleteconfirmationtype:true, value: Meteor.user().username});
        Materialize.toast("Une invitation a été envoyée à " + this.username + ".", 1000);
    }
});


      