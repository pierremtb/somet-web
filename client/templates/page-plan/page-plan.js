function dispMins(min) {
    var h = parseInt(min/60) < 10 ? "0" + parseInt(min/60) : parseInt(min/60);
    var m = min%60 < 10 ? "0" + (min%60) : (min%60)
    return h + ":" + m;
}

Template.Plan.helpers({
    title: function () { return this.title},
    isTrainer: function(){ return Meteor.user().profile === "trainer";},
    monday_support: function () { return this.monday_support},
    mondayType: function() {
        if(this.monday_type == "wk")
            return "Entrainement";
        else if(this.monday_type == "rc")
            return "Compétition";
        else if(this.monday_type == "nth")
            return "Repos";
    },
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
    isDay0Mtb: function () { return this.monday_support == "mtb"; },
    isDay0Road: function () { return this.monday_support == "road"; },
    isDay0Ht: function () { return this.monday_support == "ht" ;},
    isDay0Run: function () { return this.monday_support == "run"; },
    isDay0Skix: function () { return this.monday_support == "skix"; },
    isDay0Swim: function () { return this.monday_support == "swim" ;},
    isDay0Endr: function () { return this.monday_support == "endr" ;},
    isDay0Othr: function () { return this.monday_support == "othr" ;},
    isDay1Mtb: function () { return this.tuesday_support == "mtb"; },
    isDay1Road: function () { return this.tuesday_support == "road" ;},
    isDay1Ht: function () { return this.tuesday_support == "ht" ;},
    isDay1Run: function () { return this.tuesday_support == "run" ;},
    isDay1Skix: function () { return this.tuesday_support == "skix" ;},
    isDay1Swim: function () { return this.tuesday_support == "swim" ;},
    isDay1Endr: function () { return this.tuesday_support == "endr" ;},
    isDay1Othr: function () { return this.tuesday_support == "othr" ;},
    isDay2Mtb: function () { return this.wednesday_support == "mtb" ;},
    isDay2Road: function () { return this.wednesday_support == "road" ;},
    isDay2Ht: function () { return this.wednesday_support == "ht" ;},
    isDay2Run: function () { return this.wednesday_support == "run" ;},
    isDay2Skix: function () { return this.wednesday_support == "skix" ;},
    isDay2Swim: function () { return this.wednesday_support == "swim" ;},
    isDay2Endr: function () { return this.wednesday_support == "endr" ;},
    isDay2Othr: function () { return this.wednesday_support == "othr" ;},
    isDay3Mtb: function () { return this.thursday_support == "mtb" ;},
    isDay3Road: function () { return this.thursday_support == "road" ;},
    isDay3Ht: function () { return this.thursday_support == "ht" ;},
    isDay3Run: function () { return this.thursday_support == "run" ;},
    isDay3Skix: function () { return this.thursday_support == "skix" ;},
    isDay3Swim: function () { return this.thursday_support == "swim" ;},
    isDay3Endr: function () { return this.thursday_support == "endr" ;},
    isDay3Othr: function () { return this.thursday_support == "othr" ;},
    isDay4Mtb: function () { return this.friday_support == "mtb" ;},
    isDay4Road: function () { return this.friday_support == "road" ;},
    isDay4Ht: function () { return this.friday_support == "ht" ;},
    isDay4Run: function () { return this.friday_support == "run" ;},
    isDay4Skix: function () { return this.friday_support == "skix" ;},
    isDay4Swim: function () { return this.friday_support == "swim" ;},
    isDay4Endr: function () { return this.friday_support == "endr" ;},
    isDay4Othr: function () { return this.friday_support == "othr" ;},
    isDay5Mtb: function () { return this.saturday_support == "mtb" ;},
    isDay5Road: function () { return this.saturday_support == "road" ;},
    isDay5Ht: function () { return this.saturday_support == "ht" ;},
    isDay5Run: function () { return this.saturday_support == "run" ;},
    isDay5Skix: function () { return this.saturday_support == "skix" ;},
    isDay5Swim: function () { return this.saturday_support == "swim" ;},
    isDay5Endr: function () { return this.saturday_support == "endr" ;},
    isDay5Othr: function () { return this.saturday_support == "othr" ;},
    isDay6Mtb: function () { return this.sunday_support == "mtb" ;},
    isDay6Road: function () { return this.sunday_support == "road" ;},
    isDay6Ht: function () { return this.sunday_support == "ht" ;},
    isDay6Run: function () { return this.sunday_support == "run" ;},
    isDay6Skix: function () { return this.sunday_support == "skix" ;},
    isDay6Swim: function () { return this.sunday_support == "swim" ;},
    isDay6Endr: function () { return this.sunday_support == "endr" ;},
    isDay6Othr: function () { return this.sunday_support == "othr" ;},
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
    weekTotalDuration: function () {
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
        PlansDB.remove(t.find(".plid").innerHTML);
        document.location = "/plans";
    }
});

Template.Plan.onRendered(function() {
    var days = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];
    var subs = ["type", "support", "duration"], j;
    for(var i=0;i<7;i++) {
        for(j=0;j<3;j++) {
            Session.set("day_" + i + "_" + subs[j],this.data[days[i]+"_"+subs[j]]);
        }
    }
});
