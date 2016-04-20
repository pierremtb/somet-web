Template.WorkoutTableLine.helpers({
});

Template.WorkoutTableLine.events({
    "click #delete_bt" : (e, t) =>{
        Meteor.call("rmThisWk",t.find(".wkid").innerHTML);
    }
});
