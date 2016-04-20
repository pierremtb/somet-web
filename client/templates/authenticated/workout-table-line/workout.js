Template.WorkoutTableLine.helpers({
  isTrainer: () =>{ return Meteor.user().profile === "trainer";}
});

Template.WorkoutTableLine.events({
    "click #delete_bt" : (e, t) =>{
        Meteor.call("rmThisWk",t.find(".wkid").innerHTML);
    }
});
