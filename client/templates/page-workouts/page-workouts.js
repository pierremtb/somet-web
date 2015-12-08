function dispMins(min) {
    var h = parseInt(min/60) < 10 ? "0" + parseInt(min/60) : parseInt(min/60);
    var m = min%60 < 10 ? "0" + (min%60) : (min%60);
    return h + ":" + m;
}

var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

Template.Workouts.helpers({
    plans: function () {
      return PlansDB.find({username: Meteor.user().username}, {sort: {date: -1}});
    },
    workouts: function () {
      return WorkoutsDB.find({user: Meteor.user().username}, {sort: {date: -1}});
    },
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
    wkDistance: function () {
        if(Session.get("is_plan_based_wk"))
            return Session.get('wk_distance');
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
    wkDuration: function () { return dispMins(Session.get('wk_duration'));}
});

Template.Workouts.events({
    'click #n_wk_submit': function (e,t) {
        WorkoutsDB.insert({
          title: t.find('#n_wk_title').value,
          description: t.find('#n_wk_description').value,
          comments: t.find('#n_wk_comments').value,
          date: t.find('#n_wk_date').value,
          length: t.find('#n_wk_length').value,
          distance: t.find('#n_wk_distance').value,
          support: t.find('#n_wk_support').value,
          crten_eff: t.find('#n_wk_crten_eff').value,
          crten_ple: t.find('#n_wk_crten_ple').value,
          sensa: t.find('#n_wk_sensa').value,
          hum: t.find('#n_wk_hum').value,
          user: Meteor.user().username,
          day: new Date(t.find('#n_wk_date').value).getDate(),
          month: new Date(t.find('#n_wk_date').value).getMonth() + 1,
          year: new Date(t.find('#n_wk_date').value).getFullYear()
        });
    },
    selectedAthlete: function() { return Session.get("selectedAthlete"); },
    'change #n_wk_duration' : function(e,t) {
        Session.set("n_wk_duration",t.find('#n_wk_duration').value);
    },
    'mousemove #n_wk_duration' : function(e,t) {
        Session.set("n_wk_duration",t.find('#n_wk_duration').value);
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
    Session.set('n_wk_duration',90);
    Session.set("is_plan_based_wk", false);
});
