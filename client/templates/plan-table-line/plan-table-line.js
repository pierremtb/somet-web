Template.PlanTableLine.events({
    "click #delete_btn" : function (e,t) {
        PlansDB.remove(t.find(".plid").innerHTML);
    }
});

Template.PlanTableLine.helpers({
    trainerIs: function(){ return Meteor.user().profile === "trainer";}
});
