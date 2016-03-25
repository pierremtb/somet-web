Template.PlanTableLine.events({
    "click #delete_btn" : function (e,t) {
        Meteor.call("rmThisPl", t.find(".plid").innerHTML);
    }
});

Template.PlanTableLine.helpers({
    trainerIs: function(){ return Meteor.user().profile === "trainer";}
});
