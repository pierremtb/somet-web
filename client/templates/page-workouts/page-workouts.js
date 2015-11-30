Template.Workouts.helpers({
    workouts: function () {
      return WorkoutsDB.find({user: Meteor.user().username}, {sort: {date: -1}});
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
    me: function() {
        return Meteor.user().username;
    },
    selectedAthlete: function() { return Session.get("selectedAthlete"); }
});

Template.Workouts.events({
    'click #n_wk_submit': function (event,template) {
        WorkoutsDB.insert({
          title: template.find('#n_wk_title').value,
          description: template.find('#n_wk_description').value,
          date: template.find('#n_wk_date').value,
          length: template.find('#n_wk_length').value,
          distance: template.find('#n_wk_distance').value,
          mtb: template.find('#n_wk_mtb').checked,
          road: template.find("#n_wk_road").checked,
          other: template.find("#n_wk_other").checked,
          crten: template.find('#n_wk_crten').value,
          user: Meteor.user().username,
          day: new Date(template.find('#n_wk_date').value).getDate(),
          month: new Date(template.find('#n_wk_date').value).getMonth() + 1,
          year: new Date(template.find('#n_wk_date').value).getFullYear()
        });
    },
    'click #n_wk_crten': function(e,t) {
        t.find("#crtenvalue").innerHTML = t.find("#n_wk_crten").value;
    }
});
