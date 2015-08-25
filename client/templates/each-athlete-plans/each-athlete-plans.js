Template.AthletePlans.helpers({
    plans: function () {
          return PlansDB.find({username: this.username + ""}, {sort: {date: -1}});
    }
});