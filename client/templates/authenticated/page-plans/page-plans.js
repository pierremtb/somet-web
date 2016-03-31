function dispMins(min) {
  var h = parseInt(min / 60) < 10 ? "0" + parseInt(min / 60) : parseInt(min / 60);
  var m = min % 60 < 10 ? "0" + (min % 60) : (min % 60)
  return h + ":" + m;
}

Template.Plans.helpers({
  isTrainer() {
    return Meteor.user().profile === "trainer";
  },
  selectedAthlete() {
    return Session.get("selectedAthlete");
  },
  isDay0Wk: function (t) {
    return Session.get("day_0_type") == "wk";
  },
  isDay0Rc: function (t) {
    return Session.get("day_0_type") == "rc";
  },
  isDay0Nth: function (t) {
    return Session.get("day_0_type") == "nth";
  },
  day0Duration() {
    return dispMins(parseInt(Session.get("day_0_duration")));
  },
  isDay1Wk: function (t) {
    return Session.get("day_1_type") == "wk";
  },
  isDay1Rc: function (t) {
    return Session.get("day_1_type") == "rc";
  },
  isDay1Nth: function (t) {
    return Session.get("day_1_type") == "nth";
  },
  day1Duration() {
    return dispMins(parseInt(Session.get("day_1_duration")));
  },
  isDay2Wk: function (t) {
    return Session.get("day_2_type") == "wk";
  },
  isDay2Rc: function (t) {
    return Session.get("day_2_type") == "rc";
  },
  isDay2Nth: function (t) {
    return Session.get("day_2_type") == "nth";
  },
  day2Duration() {
    return dispMins(parseInt(Session.get("day_2_duration")));
  },
  isDay3Wk: function (t) {
    return Session.get("day_3_type") == "wk";
  },
  isDay3Rc: function (t) {
    return Session.get("day_3_type") == "rc";
  },
  isDay3Nth: function (t) {
    return Session.get("day_3_type") == "nth";
  },
  day3Duration() {
    return dispMins(parseInt(Session.get("day_3_duration")));
  },
  isDay4Wk: function (t) {
    return Session.get("day_4_type") == "wk";
  },
  isDay4Rc: function (t) {
    return Session.get("day_4_type") == "rc";
  },
  isDay4Nth: function (t) {
    return Session.get("day_4_type") == "nth";
  },
  day4Duration() {
    return dispMins(parseInt(Session.get("day_4_duration")));
  },
  isDay5Wk: function (t) {
    return Session.get("day_5_type") == "wk";
  },
  isDay5Rc: function (t) {
    return Session.get("day_5_type") == "rc";
  },
  isDay5Nth: function (t) {
    return Session.get("day_5_type") == "nth";
  },
  day5Duration() {
    return dispMins(parseInt(Session.get("day_5_duration")));
  },
  isDay6Wk: function (t) {
    return Session.get("day_6_type") == "wk";
  },
  isDay6Rc: function (t) {
    return Session.get("day_6_type") == "rc";
  },
  isDay6Nth: function (t) {
    return Session.get("day_6_type") == "nth";
  },
  day6Duration() {
    return dispMins(parseInt(Session.get("day_6_duration")));
  },
  weekTotalDuration() {
    var tot = 0;
    for (var i = 0; i < 7; i++)
      if (Session.get("day_" + i + "_duration"))
        tot += parseInt(Session.get("day_" + i + "_duration"));
    Session.set("total_duration", tot);
    return dispMins(tot);
  },
  monday() {
    return Session.get("n_pl_start_day");
  },
  tuesday() {
    return parseInt(Session.get("n_pl_start_day")) + 1;
  },
  wednesday() {
    return parseInt(Session.get("n_pl_start_day")) + 2;
  },
  thursday() {
    return parseInt(Session.get("n_pl_start_day")) + 3;
  },
  friday() {
    return parseInt(Session.get("n_pl_start_day")) + 4;
  },
  saturday() {
    return parseInt(Session.get("n_pl_start_day")) + 5;
  },
  sunday() {
    return parseInt(Session.get("n_pl_start_day")) + 6;
  }
});

Template.Plans.events({
  'click #n_pl_submit': function (event, t) {
    let days = [];
    for(let i = 0; i < 7; i++) {
      days.push({
        type: Session.get("day_" + i + "_type"),
        description: Session.get('day_' + i + '_type') && Session.get('day_' + i + '_type') != "nth" ? t.find('#day_' + i + '_desc').value : '',
        comments: Session.get('day_' + i  + '_type') && Session.get('day_' + i  + '_type') == "wk" ? t.find('#day_' + i  + '_comments').value : '',
        duration: Session.get('day_' + i  + '_type') == "wk" ? Session.get('day_' + i  + '_duration') : '',
        support: Session.get('day_' + i + '_type') && Session.get('day_' + i + '_type') != "nth" ? t.find('#day_' + i + '_support').value : ''
      });
    }
    Meteor.call("insertPlan", {
      owner: Session.get("selectedAthlete"),
      title: t.find('#n_pl_title').value,
      monday_date: new Date(t.find('#n_pl_start_date').value),
      total_duration: parseInt(Session.get("total_duration")),
      days: days
    });
    Meteor.call("sendPush", Meteor.user().username, Session.get("selectedAthlete"), "Nouveau plan", "Un nouveau plan vous a été ajouté!");
  },
  'change #day_0_type': function (e, t) {
    Session.set("day_0_type", t.find('#day_0_type').value);
    return 0;
  },
  'change #day_0_duration': function (e, t) {
    Session.set("day_0_duration", t.find('#day_0_duration').value);
    return 0;
  },
  'mousemove #day_0_duration': function (e, t) {
    Session.set("day_0_duration", t.find('#day_0_duration').value);
    return 0;
  },
  'change #day_1_type': function (e, t) {
    Session.set("day_1_type", t.find('#day_1_type').value);
    return 0;
  },
  'change #day_1_duration': function (e, t) {
    Session.set("day_1_duration", t.find('#day_1_duration').value);
    return 0;
  },
  'mousemove #day_1_duration': function (e, t) {
    Session.set("day_1_duration", t.find('#day_1_duration').value);
    return 0;
  },
  'change #day_2_type': function (e, t) {
    Session.set("day_2_type", t.find('#day_2_type').value);
    return 0;
  },
  'change #day_2_duration': function (e, t) {
    Session.set("day_2_duration", t.find('#day_2_duration').value);
    return 0;
  },
  'mousemove #day_2_duration': function (e, t) {
    Session.set("day_2_duration", t.find('#day_2_duration').value);
    return 0;
  },
  'change #day_3_type': function (e, t) {
    Session.set("day_3_type", t.find('#day_3_type').value);
    return 0;
  },
  'change #day_3_duration': function (e, t) {
    Session.set("day_3_duration", t.find('#day_3_duration').value);
    return 0;
  },
  'mousemove #day_3_duration': function (e, t) {
    Session.set("day_3_duration", t.find('#day_3_duration').value);
    return 0;
  },
  'change #day_4_type': function (e, t) {
    Session.set("day_4_type", t.find('#day_4_type').value);
    return 0;
  },
  'change #day_4_duration': function (e, t) {
    Session.set("day_4_duration", t.find('#day_4_duration').value);
    return 0;
  },
  'mousemove #day_4_duration': function (e, t) {
    Session.set("day_4_duration", t.find('#day_4_duration').value);
    return 0;
  },
  'change #day_5_type': function (e, t) {
    Session.set("day_5_type", t.find('#day_5_type').value);
    return 0;
  },
  'change #day_5_duration': function (e, t) {
    Session.set("day_5_duration", t.find('#day_5_duration').value);
    return 0;
  },
  'mousemove #day_5_duration': function (e, t) {
    Session.set("day_5_duration", t.find('#day_5_duration').value);
    return 0;
  },
  'change #day_6_type': function (e, t) {
    Session.set("day_6_type", t.find('#day_6_type').value);
    return 0;
  },
  'change #day_6_duration': function (e, t) {
    Session.set("day_6_duration", t.find('#day_6_duration').value);
    return 0;
  },
  'mousemove #day_6_duration': function (e, t) {
    Session.set("day_6_duration", t.find('#day_6_duration').value);
    return 0;
  },
  'change #n_pl_start_date': function (e, t) {
    var d = new Date(t.find('#n_pl_start_date').value);
    Session.set("n_pl_start_date", t.find('#n_pl_start_date').value);
    Session.set("n_pl_start_day", d.getDate());
    return 0;
  }
});

Template.Plans.onRendered(function () {
  for (var i = 0; i < 7; i++)
    Session.set("day_" + i + "_duration", 0);
  return 0;
})
