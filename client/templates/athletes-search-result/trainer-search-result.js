Template.AthletesSearchResult.events({
    "click #add_athlete_button": function () {
        Meteor.call("sendAthleteInvite",this.username,Meteor.user().username, function(e,r) {
            Materialize.toast(r);
        });
    }
});