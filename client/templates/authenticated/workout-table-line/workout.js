Template.WorkoutTableLine.helpers({
  isTrainer: function(){ return Meteor.user().profile === "trainer";}
});

Template.WorkoutTableLine.events({
    "click #delete_bt" : function (e,t) {
        Meteor.call("rmThisWk",t.find(".wkid").innerHTML);
    }
});
