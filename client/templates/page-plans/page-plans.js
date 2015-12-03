function dispMins(min) {
    var h = parseInt(min/60) < 10 ? "0" + parseInt(min/60) : parseInt(min/60);
    var m = min%60 < 10 ? "0" + (min%60) : (min%60)
    return h + ":" + m;
}

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
    selectedAthlete: function() { return Session.get("selectedAthlete"); },
    isDay0Wk: function (t) {
        return Session.get("day_0_type") == "wk";
    },
    isDay0Rc: function (t) {
        return Session.get("day_0_type") == "rc";
    },
    isDay0Nth: function (t) {
        return Session.get("day_0_type") == "nth";
    },
    day0Duration: function (){
        return dispMins(parseInt(Session.get("day_0_duration")));
    },
    isDay1Wk: function (t) {
        return Session.get("day_1_type") == "wk";
    },
    isDay1Rc: function (t) {
        return Session.get("day_1_type") == "rc";
    },
    isDay1Nth: function (t) {
        return Session.get("day_1_type") == "nth";
    },
    day1Duration: function (){
        return dispMins(parseInt(Session.get("day_1_duration")));
    },
    isDay2Wk: function (t) {
        return Session.get("day_2_type") == "wk";
    },
    isDay2Rc: function (t) {
        return Session.get("day_2_type") == "rc";
    },
    isDay2Nth: function (t) {
        return Session.get("day_2_type") == "nth";
    },
    day2Duration: function (){
        return dispMins(parseInt(Session.get("day_2_duration")));
    },
    isDay3Wk: function (t) {
        return Session.get("day_3_type") == "wk";
    },
    isDay3Rc: function (t) {
        return Session.get("day_3_type") == "rc";
    },
    isDay3Nth: function (t) {
        return Session.get("day_3_type") == "nth";
    },
    day3Duration: function (){
        return dispMins(parseInt(Session.get("day_3_duration")));
    },
    isDay4Wk: function (t) {
        return Session.get("day_4_type") == "wk";
    },
    isDay4Rc: function (t) {
        return Session.get("day_4_type") == "rc";
    },
    isDay4Nth: function (t) {
        return Session.get("day_4_type") == "nth";
    },
    day4Duration: function (){
        return dispMins(parseInt(Session.get("day_4_duration")));
    },
    isDay5Wk: function (t) {
        return Session.get("day_5_type") == "wk";
    },
    isDay5Rc: function (t) {
        return Session.get("day_5_type") == "rc";
    },
    isDay5Nth: function (t) {
        return Session.get("day_5_type") == "nth";
    },
    day5Duration: function (){
        return dispMins(parseInt(Session.get("day_5_duration")));
    },
    isDay6Wk: function (t) {
        return Session.get("day_6_type") == "wk";
    },
    isDay6Rc: function (t) {
        return Session.get("day_6_type") == "rc";
    },
    isDay6Nth: function (t) {
        return Session.get("day_6_type") == "nth";
    },
    day6Duration: function (){
        return dispMins(parseInt(Session.get("day_6_duration")));
    },
    weekTotalDuration: function () {
        var tot = 0;
        for(var i=0;i<7;i++)
            if(Session.get("day_" + i +"_duration"))
                tot += parseInt(Session.get("day_" + i +"_duration"));
        Session.set("total_duration",dispMins(tot));
        return dispMins(tot);
    },
    monday: function() { return Session.get("n_pl_start_day");},
    tuesday: function() { return parseInt(Session.get("n_pl_start_day"))+1;},
    wednesday: function() { return parseInt(Session.get("n_pl_start_day"))+2;},
    thursday: function() { return parseInt(Session.get("n_pl_start_day"))+3;},
    friday: function() { return parseInt(Session.get("n_pl_start_day"))+4;},
    saturday: function() { return parseInt(Session.get("n_pl_start_day"))+5;},
    sunday: function() { return parseInt(Session.get("n_pl_start_day"))+6;}
  });

Template.Plans.events({
    'click #n_pl_submit': function (event,t) {
        PlansDB.insert({
          username: Session.get("selectedAthlete"),
          title: t.find('#n_pl_title').value,
          monday_date: t.find('#n_pl_start_date').value,
          total_duration: Session.get("total_duration"),
          monday_type: Session.get("day_0_type"),
          monday_support: Session.get('day_0_type') && Session.get('day_0_type')!="nth" ? t.find('#day_0_support').value : "",
          monday_desc: Session.get('day_0_type') && Session.get('day_0_type')!="nth" ? t.find('#day_0_desc').value : "",
          monday_duration: Session.get('day_0_duration'),
          monday_comments: Session.get('day_0_type') && Session.get('day_0_type')!="nth" ? t.find('#day_0_comments').value : "",
          tuesday_type: Session.get("day_1_type"),
          tuesday_support: Session.get('day_1_type') && Session.get('day_1_type')!="nth" ? t.find('#day_1_support').value : "",
          tuesday_desc:  Session.get('day_1_type') && Session.get('day_1_type')!="nth" ? t.find('#day_1_desc').value : "",
          tuesday_duration: Session.get('day_1_duration'),
          tuesday_comments:  Session.get('day_1_type') && Session.get('day_1_type')!="nth" ? t.find('#day_1_comments').value : "",
          wednesday_type: Session.get("day_2_type"),
          wednesday_support:  Session.get('day_2_type') && Session.get('day_2_type')!="nth" ? t.find('#day_2_support').value : "",
          wednesday_desc: Session.get('day_2_type') && Session.get('day_2_type')!="nth" ? t.find('#day_2_desc').value : "",
          wednesday_duration: Session.get('day_2_duration'),
          wednesday_comments: Session.get('day_2_type') && Session.get('day_2_type')!="nth" ? t.find('#day_2_comments').value : "",
          thursday_type: Session.get("day_3_type"),
          thursday_support: Session.get('day_3_type') && Session.get('day_3_type')!="nth" ? t.find('#day_3_support').value : "",
          thursday_desc: Session.get('day_3_type') && Session.get('day_3_type')!="nth" ? t.find('#day_3_desc').value : "",
          thursday_duration: Session.get('day_3_duration'),
          thursday_comments: Session.get('day_3_type') && Session.get('day_3_type')!="nth" ? t.find('#day_3_comments').value : "",
          friday_type: Session.get("day_4_type"),
          friday_support: Session.get('day_4_type') && Session.get('day_4_type')!="nth" ? t.find('#day_4_support').value : "",
          friday_desc: Session.get('day_4_type') && Session.get('day_4_type')!="nth" ? t.find('#day_4_desc').value : "",
          friday_duration: Session.get('day_4_duration'),
          friday_comments: Session.get('day_4_type') && Session.get('day_4_type')!="nth" ? t.find('#day_4_comments').value : "",
          saturday_type: Session.get("day_5_type"),
          saturday_support: Session.get('day_5_type') && Session.get('day_5_type')!="nth" ? t.find('#day_5_support').value : "",
          saturday_desc: Session.get('day_5_type') && Session.get('day_5_type')!="nth" ? t.find('#day_5_desc').value : "",
          saturday_duration: Session.get('day_5_duration'),
          saturday_comments: Session.get('day_5_type') && Session.get('day_5_type')!="nth" ? t.find('#day_5_comments').value : "",
          sunday_type: Session.get("day_6_type"),
          sunday_support: Session.get('day_6_type') && Session.get('day_6_type')!="nth" ? t.find('#day_6_support').value : "",
          sunday_desc: Session.get('day_6_type') && Session.get('day_6_type')!="nth" ? t.find('#day_6_desc').value : "",
          sunday_duration: Session.get('day_6_duration'),
          sunday_comments: Session.get('day_6_type') && Session.get('day_6_type')!="nth" ? t.find('#day_6_comments').value :"" });
    },
    'change #day_0_type' : function(e,t) {
        Session.set("day_0_type",t.find('#day_0_type').value);
    },
    'change #day_0_duration' : function(e,t) {
        Session.set("day_0_duration",t.find('#day_0_duration').value);
    },
    'mousemove #day_0_duration' : function(e,t) {
        Session.set("day_0_duration",t.find('#day_0_duration').value);
    },
    'change #day_1_type' : function(e,t) {
        Session.set("day_1_type",t.find('#day_1_type').value);
    },
    'change #day_1_duration' : function(e,t) {
        Session.set("day_1_duration",t.find('#day_1_duration').value);
    },
    'mousemove #day_1_duration' : function(e,t) {
        Session.set("day_1_duration",t.find('#day_1_duration').value);
    },
    'change #day_2_type' : function(e,t) {
        Session.set("day_2_type",t.find('#day_2_type').value);
    },
    'change #day_2_duration' : function(e,t) {
        Session.set("day_2_duration",t.find('#day_2_duration').value);
    },
    'mousemove #day_2_duration' : function(e,t) {
        Session.set("day_2_duration",t.find('#day_2_duration').value);
    },
    'change #day_3_type' : function(e,t) {
        Session.set("day_3_type",t.find('#day_3_type').value);
    },
    'change #day_3_duration' : function(e,t) {
        Session.set("day_3_duration",t.find('#day_3_duration').value);
    },
    'mousemove #day_3_duration' : function(e,t) {
        Session.set("day_3_duration",t.find('#day_3_duration').value);
    },
    'change #day_4_type' : function(e,t) {
        Session.set("day_4_type",t.find('#day_4_type').value);
    },
    'change #day_4_duration' : function(e,t) {
        Session.set("day_4_duration",t.find('#day_4_duration').value);
    },
    'mousemove #day_4_duration' : function(e,t) {
        Session.set("day_4_duration",t.find('#day_4_duration').value);
    },
    'change #day_5_type' : function(e,t) {
        Session.set("day_5_type",t.find('#day_5_type').value);
    },
    'change #day_5_duration' : function(e,t) {
        Session.set("day_5_duration",t.find('#day_5_duration').value);
    },
    'mousemove #day_5_duration' : function(e,t) {
        Session.set("day_5_duration",t.find('#day_5_duration').value);
    },
    'change #day_6_type' : function(e,t) {
        Session.set("day_6_type",t.find('#day_6_type').value);
    },
    'change #day_6_duration' : function(e,t) {
        Session.set("day_6_duration",t.find('#day_6_duration').value);
    },
    'mousemove #day_6_duration' : function(e,t) {
        Session.set("day_6_duration",t.find('#day_6_duration').value);
    },
    'change #n_pl_start_date' : function(e,t) {
        var d = new Date(t.find('#n_pl_start_date').value);
        Session.set("n_pl_start_date",t.find('#n_pl_start_date').value);
        Session.set("n_pl_start_day",d.getDate());
    }

});

Template.Plans.onRendered(function() {
    Session.set("day_0_duration",90);
})
