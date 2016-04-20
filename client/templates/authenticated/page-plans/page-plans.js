function dispMins(min) {
  var h = parseInt(min / 60) < 10 ? "0" + parseInt(min / 60) : parseInt(min / 60);
  var m = min % 60 < 10 ? "0" + (min % 60) : (min % 60)
  return h + ":" + m;
}

Template.Plans.helpers({
  selectedAthlete() {
    return Session.get("selectedAthlete");
  }
});

Template.Plans.events({
  'click #n_pl_submit': function (event, t) {
    let days = [];
    for(let i = 0; i < 7; i++) {
      if(Session.get("day_" + i + "_type") == 'wk') {
        days.push({
          type: "wk",
          description: Session.get('day_' + i + '_description'),
          duration: Session.get('day_' + i + '_duration'),
          support: Session.get('day_' + i + '_support')
        });
      } else if (Session.get("day_" + i + "_type") == 'rc'){
        days.push({
          type: 'rc',
          event_id: Session.get('day_' + i + '_event_id')
        })
      } else {
        days.push({
          type: 'nth'
        })
      }
    }
    console.log(days);
    Meteor.call("insertPlan", {
      owner: Session.get("selectedAthlete"),
      title: t.find('#n_pl_title').value,
      monday_date: new Date(t.find('#n_pl_start_date').value),
      total_duration: parseInt(Session.get("pl_total_duration")),
      days: days
    });
    Meteor.call("sendPush", Meteor.user().username, Session.get("selectedAthlete"), "Nouveau plan", "Un nouveau plan vous a été ajouté!");
  },
  'change #n_pl_start_date': function (e, t) {
    var d = new Date(t.find('#n_pl_start_date').value);
    console.log(d.getTime());
    Session.set("n_pl_start_date", d);
    Session.set("n_pl_start_timestamp", d.getTime());
    Session.set("n_pl_start_day", d.getDate());
    return 0;
  }
});

Template.Plans.onRendered(function () {
  for (var i = 0; i < 7; i++) {
    Session.set("day_" + i + "_duration", 0);
    Session.set("day_" + i + "_description", '');
    Session.set("day_" + i + "_support", 0);
    Session.set("day_" + i + "_type", 0);
  }
  return 0;
});
