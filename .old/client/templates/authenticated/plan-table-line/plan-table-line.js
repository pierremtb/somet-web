Template.PlanTableLine.events({
    "click #delete_btn" : (e, t) =>{
        Meteor.call("rmThisPl", t.find(".plid").innerHTML);
    }
});

Template.PlanTableLine.helpers({
    trainerIs: () =>{ return Meteor.user().profile === "trainer";}
});
