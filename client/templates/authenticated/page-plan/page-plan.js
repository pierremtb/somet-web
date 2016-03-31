Template.Plan.onCreated(function () {
  pl = new ReactiveVar({});
});

Template.Plan.onRendered(function () {
  var done = false;
  Tracker.autorun(function () {
    if (FlowRouter.subsReady() && !done) {
      if(PlansDB.findOne()) {
        pl.set(PlansDB.findOne());
        done = true;
      } else {
        FlowRouter.redirect('/dashboard');
      }
    }
  });
});

function dispMins(min) {
    var h = parseInt(min/60) < 10 ? "0" + parseInt(min/60) : parseInt(min/60);
    var m = min%60 < 10 ? "0" + (min%60) : (min%60)
    return h + ":" + m;
}

Template.Plan.helpers({
    title() { return pl.get().title },
    days() { return pl.get().days },
    monday_date() { return pl.get().monday_date },
    monday_support() { return this.monday_support},
    mondayType: function() {
        if(this.monday_type == "wk")
            return "Entrainement";
        else if(this.monday_type == "rc")
            return "Compétition";
        else if(this.monday_type == "nth")
            return "Repos";
    },
    isDay0Wk: function (t) {
        return pl.get()[0].type == "wk";
    },
    isDay0Rc: function (t) {
        return pl.get()[0].type == "rc";
    },
    isDay0Nth: function (t) {
        return pl.get()[0].type == "nth";
    },
    day0Duration(){
        return dispMins(parseInt(pl.get()[0].duration));
    },
    isDay1Wk: function (t) {
        return pl.get()[1].type == "wk";
    },
    isDay1Rc: function (t) {
        return pl.get()[1].type == "rc";
    },
    isDay1Nth: function (t) {
        return pl.get()[1].type == "nth";
    },
    day1Duration(){
        return dispMins(parseInt(pl.get()[1].duration));
    },
    isDay2Wk: function (t) {
        return pl.get()[2].type == "wk";
    },
    isDay2Rc: function (t) {
        return pl.get()[2].type == "rc";
    },
    isDay2Nth: function (t) {
        return pl.get()[2].type == "nth";
    },
    day2Duration(){
        return dispMins(parseInt(pl.get()[2].duration));
    },
    isDay3Wk: function (t) {
        return pl.get()[3].type == "wk";
    },
    isDay3Rc: function (t) {
        return pl.get()[3].type == "rc";
    },
    isDay3Nth: function (t) {
        return pl.get()[3].type == "nth";
    },
    day3Duration(){
        return dispMins(parseInt(pl.get()[3].duration));
    },
    isDay4Wk: function (t) {
        return pl.get()[4].type == "wk";
    },
    isDay4Rc: function (t) {
        return pl.get()[4].type == "rc";
    },
    isDay4Nth: function (t) {
        return pl.get()[4].type == "nth";
    },
    day4Duration(){
        return dispMins(parseInt(pl.get()[4].duration));
    },
    isDay5Wk: function (t) {
        return pl.get()[5].type == "wk";
    },
    isDay5Rc: function (t) {
        return pl.get()[5].type == "rc";
    },
    isDay5Nth: function (t) {
        return pl.get()[5].type == "nth";
    },
    day5Duration(){
        return dispMins(parseInt(pl.get()[5].duration));
    },
    isDay6Wk: function (t) {
        return pl.get()[6].type == "wk";
    },
    isDay6Rc: function (t) {
        return pl.get()[6].type == "rc";
    },
    isDay6Nth: function (t) {
        return pl.get()[6].type == "nth";
    },
    day6Duration(){
        return dispMins(parseInt(pl.get()[6].duration));
    },
    isDay0Mtb() { return this.monday_support == "mtb"; },
    isDay0Road() { return this.monday_support == "road"; },
    isDay0Ht() { return this.monday_support == "ht" ;},
    isDay0Run() { return this.monday_support == "run"; },
    isDay0Skix() { return this.monday_support == "skix"; },
    isDay0Swim() { return this.monday_support == "swim" ;},
    isDay0Endr() { return this.monday_support == "endr" ;},
    isDay0Othr() { return this.monday_support == "othr" ;},
    isDay1Mtb() { return this.tuesday_support == "mtb"; },
    isDay1Road() { return this.tuesday_support == "road" ;},
    isDay1Ht() { return this.tuesday_support == "ht" ;},
    isDay1Run() { return this.tuesday_support == "run" ;},
    isDay1Skix() { return this.tuesday_support == "skix" ;},
    isDay1Swim() { return this.tuesday_support == "swim" ;},
    isDay1Endr() { return this.tuesday_support == "endr" ;},
    isDay1Othr() { return this.tuesday_support == "othr" ;},
    isDay2Mtb() { return this.wednesday_support == "mtb" ;},
    isDay2Road() { return this.wednesday_support == "road" ;},
    isDay2Ht() { return this.wednesday_support == "ht" ;},
    isDay2Run() { return this.wednesday_support == "run" ;},
    isDay2Skix() { return this.wednesday_support == "skix" ;},
    isDay2Swim() { return this.wednesday_support == "swim" ;},
    isDay2Endr() { return this.wednesday_support == "endr" ;},
    isDay2Othr() { return this.wednesday_support == "othr" ;},
    isDay3Mtb() { return this.thursday_support == "mtb" ;},
    isDay3Road() { return this.thursday_support == "road" ;},
    isDay3Ht() { return this.thursday_support == "ht" ;},
    isDay3Run() { return this.thursday_support == "run" ;},
    isDay3Skix() { return this.thursday_support == "skix" ;},
    isDay3Swim() { return this.thursday_support == "swim" ;},
    isDay3Endr() { return this.thursday_support == "endr" ;},
    isDay3Othr() { return this.thursday_support == "othr" ;},
    isDay4Mtb() { return this.friday_support == "mtb" ;},
    isDay4Road() { return this.friday_support == "road" ;},
    isDay4Ht() { return this.friday_support == "ht" ;},
    isDay4Run() { return this.friday_support == "run" ;},
    isDay4Skix() { return this.friday_support == "skix" ;},
    isDay4Swim() { return this.friday_support == "swim" ;},
    isDay4Endr() { return this.friday_support == "endr" ;},
    isDay4Othr() { return this.friday_support == "othr" ;},
    isDay5Mtb() { return this.saturday_support == "mtb" ;},
    isDay5Road() { return this.saturday_support == "road" ;},
    isDay5Ht() { return this.saturday_support == "ht" ;},
    isDay5Run() { return this.saturday_support == "run" ;},
    isDay5Skix() { return this.saturday_support == "skix" ;},
    isDay5Swim() { return this.saturday_support == "swim" ;},
    isDay5Endr() { return this.saturday_support == "endr" ;},
    isDay5Othr() { return this.saturday_support == "othr" ;},
    isDay6Mtb() { return this.sunday_support == "mtb" ;},
    isDay6Road() { return this.sunday_support == "road" ;},
    isDay6Ht() { return this.sunday_support == "ht" ;},
    isDay6Run() { return this.sunday_support == "run" ;},
    isDay6Skix() { return this.sunday_support == "skix" ;},
    isDay6Swim() { return this.sunday_support == "swim" ;},
    isDay6Endr() { return this.sunday_support == "endr" ;},
    isDay6Othr() { return this.sunday_support == "othr" ;},
    monday_type: function () { return this.mondayType;},
    mondaySupport: function() {
        if(this.monday_support == "mtb")
            return "VTT";
        else if(this.monday_support == "road")
            return "Route";
        else if(this.monday_support == "ht")
            return "Home Trainer";
        else if(this.monday_support == "run")
            return "Course à pied";
        else if(this.monday_support == "skix")
            return "Ski de fond";
        else if(this.monday_support == "swim")
            return "Natation";
        else if(this.monday_support == "endr")
            return "Enduro";
        else if(this.monday_support == "othr")
            return "Autre";
    },
    weekTotalDuration() {
        var tot = 0;
        for(var i=0;i<7;i++)
            if(Session.get("day_" + i +"_duration"))
                tot += parseInt(Session.get("day_" + i +"_duration"));
        Session.set("total_duration",dispMins(tot));
        return dispMins(tot);
    },
    mondayDuration : function() {return dispMins(this.monday_duration);},
    mondayMinDuration : function() {return this.monday_duration;},
    tuesdayMinDuration : function() {return this.tuesday_duration;},
    wednesdayMinDuration : function() {return this.wednesday_duration;},
    thursdayMinDuration : function() {return this.thursday_duration;},
    fridayMinDuration : function() {return this.friday_duration;},
    saturdayMinDuration : function() {return this.saturday_duration;},
    sundayMinDuration : function() {return this.sunday_duration;},
    tuesdayType: function() {
        if(this.tuesday_type == "wk")
            return "Entrainement";
        else if(this.tuesday_type == "rc")
            return "Compétition";
        else if(this.tuesday_type == "nth")
            return "Repos";
    },
    tuesdaySupport: function() {
        if(this.tuesday_support == "mtb")
            return "VTT";
        else if(this.tuesday_support == "road")
            return "Route";
        else if(this.tuesday_support == "ht")
            return "Home Trainer";
        else if(this.tuesday_support == "run")
            return "Course à pied";
        else if(this.tuesday_support == "skix")
            return "Ski de fond";
        else if(this.tuesday_support == "swim")
            return "Natation";
        else if(this.tuesday_support == "endr")
            return "Enduro";
        else if(this.tuesday_support == "othr")
            return "Autre";
    },
    tuesdayDuration : function() {return dispMins(this.tuesday_duration);},
    wednesdayType: function() {
        if(this.wednesday_type == "wk")
            return "Entrainement";
        else if(this.wednesday_type == "rc")
            return "Compétition";
        else if(this.wednesday_type == "nth")
            return "Repos";
    },
    wednesdaySupport: function() {
        if(this.wednesday_support == "mtb")
            return "VTT";
        else if(this.wednesday_support == "road")
            return "Route";
        else if(this.wednesday_support == "ht")
            return "Home Trainer";
        else if(this.wednesday_support == "run")
            return "Course à pied";
        else if(this.wednesday_support == "skix")
            return "Ski de fond";
        else if(this.wednesday_support == "swim")
            return "Natation";
        else if(this.wednesday_support == "endr")
            return "Enduro";
        else if(this.wednesday_support == "othr")
            return "Autre";
    },
    wednesdayDuration : function() {return dispMins(this.wednesday_duration);},
    thursdayType: function() {
        if(this.thursday_type == "wk")
            return "Entrainement";
        else if(this.thursday_type == "rc")
            return "Compétition";
        else if(this.thursday_type == "nth")
            return "Repos";
    },
    thursdaySupport: function() {
        if(this.thursday_support == "mtb")
            return "VTT";
        else if(this.thursday_support == "road")
            return "Route";
        else if(this.thursday_support == "ht")
            return "Home Trainer";
        else if(this.thursday_support == "run")
            return "Course à pied";
        else if(this.thursday_support == "skix")
            return "Ski de fond";
        else if(this.thursday_support == "swim")
            return "Natation";
        else if(this.thursday_support == "endr")
            return "Enduro";
        else if(this.thursday_support == "othr")
            return "Autre";
    },
    thursdayDuration : function() {return dispMins(this.thursday_duration);},
    fridayType: function() {
        if(this.friday_type == "wk")
            return "Entrainement";
        else if(this.friday_type == "rc")
            return "Compétition";
        else if(this.friday_type == "nth")
            return "Repos";
    },
    fridaySupport: function() {
        if(this.friday_support == "mtb")
            return "VTT";
        else if(this.friday_support == "road")
            return "Route";
        else if(this.friday_support == "ht")
            return "Home Trainer";
        else if(this.friday_support == "run")
            return "Course à pied";
        else if(this.friday_support == "skix")
            return "Ski de fond";
        else if(this.friday_support == "swim")
            return "Natation";
        else if(this.friday_support == "endr")
            return "Enduro";
        else if(this.friday_support == "othr")
            return "Autre";
    },
    fridayDuration : function() {return dispMins(this.friday_duration);},
    saturdayType: function() {
        if(this.saturday_type == "wk")
            return "Entrainement";
        else if(this.saturday_type == "rc")
            return "Compétition";
        else if(this.saturday_type == "nth")
            return "Repos";
    },
    saturdaySupport: function() {
        if(this.saturday_support == "mtb")
            return "VTT";
        else if(this.saturday_support == "road")
            return "Route";
        else if(this.saturday_support == "ht")
            return "Home Trainer";
        else if(this.saturday_support == "run")
            return "Course à pied";
        else if(this.saturday_support == "skix")
            return "Ski de fond";
        else if(this.saturday_support == "swim")
            return "Natation";
        else if(this.saturday_support == "endr")
            return "Enduro";
        else if(this.saturday_support == "othr")
            return "Autre";
    },
    saturdayDuration : function() {return dispMins(this.saturday_duration);},
    sundayType: function() {
        if(this.sunday_type == "wk")
            return "Entrainement";
        else if(this.sunday_type == "rc")
            return "Compétition";
        else if(this.sunday_type == "nth")
            return "Repos";
    },
    sundaySupport: function() {
        if(this.sunday_support == "mtb")
            return "VTT";
        else if(this.sunday_support == "road")
            return "Route";
        else if(this.sunday_support == "ht")
            return "Home Trainer";
        else if(this.sunday_support == "run")
            return "Course à pied";
        else if(this.sunday_support == "skix")
            return "Ski de fond";
        else if(this.sunday_support == "swim")
            return "Natation";
        else if(this.sunday_support == "endr")
            return "Enduro";
        else if(this.sunday_support == "othr")
            return "Autre";
    },
    sundayDuration : function() {return dispMins(this.sunday_duration);}
});

Template.Plan.events({
    'click #n_pl_submit': function (event,t) {
        PlansDB.update(this._id, {
            $set: {
              title: t.find('#n_pl_title').value,
              monday_date: t.find('#n_pl_start_date').value,
              total_duration: Session.get("total_duration"),
              monday_type: Session.get("day_0_type"),
              monday_support: Session.get('day_0_type') && Session.get('day_0_type')!="nth" ? t.find('#day_0_support').value : "",
              monday_desc: Session.get('day_0_type') && Session.get('day_0_type')!="nth" ? t.find('#day_0_desc').value : "",
              monday_duration: Session.get('day_0_type')=="wk" ? Session.get('day_0_duration') : "",
              monday_comments: Session.get('day_0_type') && Session.get('day_0_type')=="wk"  ? t.find('#day_0_comments').value : "",
              tuesday_type: Session.get("day_1_type"),
              tuesday_support: Session.get('day_1_type') && Session.get('day_1_type')!="nth" ? t.find('#day_1_support').value : "",
              tuesday_desc:  Session.get('day_1_type') && Session.get('day_1_type')!="nth" ? t.find('#day_1_desc').value : "",
              tuesday_duration: Session.get('day_0_type')=="wk" ? Session.get('day_1_duration') : "",
              tuesday_comments:  Session.get('day_1_type') && Session.get('day_1_type')=="wk"  ? t.find('#day_1_comments').value : "",
              wednesday_type: Session.get("day_2_type"),
              wednesday_support:  Session.get('day_2_type') && Session.get('day_2_type')!="nth" ? t.find('#day_2_support').value : "",
              wednesday_desc: Session.get('day_2_type') && Session.get('day_2_type')!="nth" ? t.find('#day_2_desc').value : "",
              wednesday_duration: Session.get('day_2_type')=="wk" ? Session.get('day_2_duration') : "",
              wednesday_comments: Session.get('day_2_type') && Session.get('day_2_type')=="wk"  ? t.find('#day_2_comments').value : "",
              thursday_type: Session.get("day_3_type"),
              thursday_support: Session.get('day_3_type') && Session.get('day_3_type')!="nth" ? t.find('#day_3_support').value : "",
              thursday_desc: Session.get('day_3_type') && Session.get('day_3_type')!="nth" ? t.find('#day_3_desc').value : "",
              thursday_duration: Session.get('day_3_type')=="wk" ? Session.get('day_3_duration') : "",
              thursday_comments: Session.get('day_3_type') && Session.get('day_3_type')=="wk"   ? t.find('#day_3_comments').value : "",
              friday_type: Session.get("day_4_type"),
              friday_support: Session.get('day_4_type') && Session.get('day_4_type')!="nth" ? t.find('#day_4_support').value : "",
              friday_desc: Session.get('day_4_type') && Session.get('day_4_type')!="nth" ? t.find('#day_4_desc').value : "",
              friday_duration:  Session.get('day_4_type')=="wk" ?  Session.get('day_4_duration') : "",
              friday_comments: Session.get('day_4_type') && Session.get('day_4_type')=="wk"  ? t.find('#day_4_comments').value : "",
              saturday_type: Session.get("day_5_type"),
              saturday_support: Session.get('day_5_type') && Session.get('day_5_type')!="nth" ? t.find('#day_5_support').value : "",
              saturday_desc: Session.get('day_5_type') && Session.get('day_5_type')!="nth" ? t.find('#day_5_desc').value : "",
              saturday_duration: Session.get('day_5_type')=="wk" ? Session.get('day_5_duration') : "",
              saturday_comments: Session.get('day_5_type')  && Session.get('day_5_type')=="wk"  ? t.find('#day_5_comments').value : "",
              sunday_type: Session.get("day_6_type"),
              sunday_support: Session.get('day_6_type') && Session.get('day_6_type')!="nth" ? t.find('#day_6_support').value : "",
              sunday_desc: Session.get('day_6_type') && Session.get('day_6_type')!="nth" ? t.find('#day_6_desc').value : "",
              sunday_duration: Session.get('day_6_type')=="wk" ? Session.get('day_6_duration') : "",
              sunday_comments: Session.get('day_6_type')  && Session.get('day_6_type')=="wk" ? t.find('#day_6_comments').value :"" }
      });
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
    },
    "click #delete_btn" : function (e,t) {
        Meteor.call("rmThisPl", t.find(".plid").innerHTML);
        document.location = "/plans";
    }
});
