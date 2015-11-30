Template.Plans.helpers({
    plans: function () {
      return PlansDB.find({}, {sort: {date: -1}});
    },
    athletes: function () {
      return AthletesDB.find({trainer: Meteor.user().username});
    },
    trainerIs: function(){
        if(Meteor.user().profile === "trainer")
            return true;
        else
            return false;
    },
    selectedAthlete: function() { return Session.get("selectedAthlete"); }
  });

Template.Plans.events({
    'click #n_pl_submit': function (event,template) {
        PlansDB.insert({
          title: template.find('#n_pl_title').value,
          monday: template.find('#n_pl_mon').value,
          tuesday: template.find('#n_pl_tue').value,
          wednesday: template.find('#n_pl_wed').value,
          date: template.find('#n_pl_date').value,
          thursday: template.find('#n_pl_thu').value,
          friday: template.find('#n_pl_fri').value,
          saturday: template.find('#n_pl_sat').value,
          sunday: template.find('#n_pl_sun').value,
          comments: template.find('#n_pl_com').value,
          username: Session.get("selectedAthlete")
        });
    }
});
