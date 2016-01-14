function dispMins(min) {
    var h = parseInt(min/60) < 10 ? "0" + parseInt(min/60) : parseInt(min/60);
    var m = min%60 < 10 ? "0" + (min%60) : (min%60);
    return h + ":" + m;
}

var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

Template.Workouts.helpers({
    isThisSupport: function (s) {
        if(Session.get("is_plan_based_wk"))
            return Session.get('wk_support') == s;
        else
            return false;
    },
    isItNotNth: function (toTest) { return toTest != "nth" && toTest != ""; },
    getType: function(type) {
        if(type == "wk")
            return "Entrainement";
        else if(type == "rc")
            return "Compétition";
        else if(type == "nth")
            return "Repos";
    },
    wkTitle: function () {
        if(Session.get("is_plan_based_wk"))
            return Session.get('wk_title');
        else
            return "Séance";
    },
    wkDesc: function () {
        if(Session.get("is_plan_based_wk"))
            return Session.get('wk_desc');
        else
            return "";
    },
    wkComments: function () {
        if(Session.get("is_plan_based_wk"))
            return Session.get('wk_comments');
        else
            return "";
    },
    selectedAthlete: function() { return Session.get("selectedAthlete"); },
    wkDistance: function () {
        if(Session.get("is_plan_based_wk"))
            return Math.round(Session.get('wk_distance')/1000 * Math.pow(10,2)) / Math.pow(10,2);
        else
            return 25;
    },
    wkDate: function () {
        if(Session.get("is_plan_based_wk"))
            return Session.get('wk_date');
        else {
            var d = new Date();
            return d.getDate() + " " + monthNames[d.getMonth()] + ", " + d.getFullYear();
        }
    },
    isTrainer: function(){ return Meteor.user().profile === "trainer"; },
    me: function() { return Meteor.user().username; },
    dispMins: function(min) {
        var h = parseInt(min/60) < 10 ? "0" + parseInt(min/60) : parseInt(min/60);
        var m = min%60 < 10 ? "0" + (min%60) : (min%60);
        return h + ":" + m;
    },
    wkDuration: function () { return parseInt(Session.get('wk_duration'));},
    plans: function() { return PlansDB.find()}
});

Template.Workouts.events({
    'click #n_wk_submit': function (e,t) {
        Meteor.call("addThisWk",{
          title: t.find('#n_wk_title').value,
          description: t.find('#n_wk_description').value,
          comments: t.find('#n_wk_comments').value,
          date: t.find('#n_wk_date').value,
          length: Session.get("wk_duration"),
          distance: t.find('#n_wk_distance').value,
          support: t.find('#n_wk_support').value,
          crten_eff: t.find('#n_wk_crten_eff').value,
          crten_ple: t.find('#n_wk_crten_ple').value,
          sensa: t.find('#n_wk_sensa').value,
          hum: t.find('#n_wk_hum').value,
          is_fit: Session.get("wk_is_fit"),
          time_values: Session.get("wk_is_fit") ? Session.get("wk_time_values") : "",
          distance_values: Session.get("wk_is_fit") ? Session.get("wk_distance_values") : "",
          elevation_values: Session.get("wk_is_fit") ? Session.get("wk_elevation_values") : "",
          power_values: Session.get("wk_is_fit") ? Session.get("wk_power_values") : "",
          speed_values: Session.get("wk_is_fit") ? Session.get("wk_speed_values") : "",
          cadence_values: Session.get("wk_is_fit") ? Session.get("wk_cadence_values") : "",
          user: Meteor.user().username,
          day: new Date(t.find('#n_wk_date').value).getDate(),
          month: new Date(t.find('#n_wk_date').value).getMonth() + 1,
          year: new Date(t.find('#n_wk_date').value).getFullYear(),
          avg_speed: Session.get("wk_avg_speed"),
          max_speed: Session.get("wk_max_speed"),
          avg_cadence: Session.get("wk_avg_cadence"),
          max_cadence: Session.get("wk_max_cadence"),
          avg_power: Session.get("wk_avg_power"),
          max_power: Session.get("wk_max_power"),
          ascent: Session.get("wk_ascent"),
          descent: Session.get("wk_descent"),
          calories: Session.get("wk_calories")
        });
        Session.set("wk_time_values","");
        Session.set("wk_distance_values","");
        Session.set("wk_elevation_values","");
        Session.set("wk_power_values","");
        Session.set("wk_cadence_values","");
    },
    'change #n_wk_length' : function(e,t) {
        Session.set("wk_duration", t.find("#n_wk_length").value);
    },
    'mousemove #n_wk_length' : function(e,t) {
        Session.set("wk_duration", t.find("#n_wk_length").value);
    },
    'click #open_this_0': function (e,t) {
        $('#select_plan').closeModal();
        Session.set('is_plan_based_wk',true);
        Session.set('wk_support',this.monday_support);
        Session.set('wk_duration',this.monday_duration);
        Session.set('wk_title',this.title);
        Session.set('wk_date',this.monday_date);
        Session.set('wk_desc',this.monday_desc);
        Session.set('wk_comments',this.monday_comments);
        $('#add_workout').openModal();
    },
    'click #open_this_1': function (e,t) {
        $('#select_plan').closeModal();
        Session.set('is_plan_based_wk',true);
        Session.set('wk_support',this.tuesday_support);
        Session.set('wk_duration',this.tuesday_duration);
        Session.set('wk_title',this.title);
        Session.set('wk_date',this.tuesday_date);
        Session.set('wk_desc',this.tuesday_desc);
        Session.set('wk_comments',this.tuesday_comments);
        $('#add_workout').openModal();
    },
    'click #open_this_2': function (e,t) {
        $('#select_plan').closeModal();
        Session.set('is_plan_based_wk',true);
        Session.set('wk_support',this.wednesday_support);
        Session.set('wk_duration',this.wednesday_duration);
        Session.set('wk_title',this.title);
        Session.set('wk_date',this.wednesday_date);
        Session.set('wk_desc',this.wednesday_desc);
        Session.set('wk_comments',this.wednesday_comments);
        $('#add_workout').openModal();
    },
    'click #open_this_3': function (e,t) {
        $('#select_plan').closeModal();
        Session.set('is_plan_based_wk',true);
        Session.set('wk_support',this.thursday_support);
        Session.set('wk_duration',this.thursday_duration);
        Session.set('wk_title',this.title);
        Session.set('wk_date',this.thursday_date);
        Session.set('wk_desc',this.thursday_desc);
        Session.set('wk_comments',this.thursday_comments);
        $('#add_workout').openModal();
    },
    'click #open_this_4': function (e,t) {
        $('#select_plan').closeModal();
        Session.set('is_plan_based_wk',true);
        Session.set('wk_support',this.friday_support);
        Session.set('wk_duration',this.friday_duration);
        Session.set('wk_title',this.title);
        Session.set('wk_date',this.friday_date);
        Session.set('wk_desc',this.friday_desc);
        Session.set('wk_comments',this.friday_comments);
        $('#add_workout').openModal();
    },
    'click #open_this_5': function (e,t) {
        $('#select_plan').closeModal();
        Session.set('is_plan_based_wk',true);
        Session.set('wk_support',this.saturday_support);
        Session.set('wk_duration',this.saturday_duration);
        Session.set('wk_title',this.title);
        Session.set('wk_date',this.saturday_date);
        Session.set('wk_desc',this.saturday_desc);
        Session.set('wk_comments',this.saturday_comments);
        $('#add_workout').openModal();
    },
    'click #open_this_6': function (e,t) {
        $('#select_plan').closeModal();
        Session.set('is_plan_based_wk',true);
        Session.set('wk_support',this.sunday_support);
        Session.set('wk_duration',this.sunday_duration);
        Session.set('wk_title',this.title);
        Session.set('wk_date',this.sunday_date);
        Session.set('wk_desc',this.sunday_desc);
        Session.set('wk_comments',this.sunday_comments);
        $('#add_workout').openModal();
    }
});

Template.Workouts.onRendered(function() {
    Session.set('wk_duration',90);
    Session.set("is_plan_based_wk", false);
});
