Router.route('/workouts', function () {
      this.render('Workouts');
});

Router.route('/plans', function () {
      this.render('Plans');
});

Router.route('/signup', function () {
      this.render('Signup');
});

Router.route('/athletes', function () {
      this.render('MyAthletes');
});

Router.route('/settings', function () {
      this.render('Settings');
});

Router.route('/calendar', function () {
      this.render('Calendar');
});

Router.route('/analysis', function () {
      this.render('Analysis');
});


Router.route('/', function () {
  if(Meteor.user()) {
    this.render('Dashboard');
  } else {
     this.render('Login');
  }
});

Router.route('/workout/:id', function() {
    wk = new ReactiveVar();
    if(Meteor.user()) {
      this.render('Workout', {
          data: function() {
              Meteor.call("getThisWk",this.params.id,function(e,r) {
                 wk.set(r);
              });
              return wk.get();
          }
      });
    } else {
       this.render('Login');
    }
});

Router.route('/plan/:id', function() {
    if(Meteor.user()) {
      this.render('Plan', {
          data: function() { return PlansDB.findOne({"_id":this.params.id})}
      });
    } else {
       this.render('Login');
    }
});

Meteor.startup(function() {
  Uploader.uploadUrl = Meteor.absoluteUrl("upload"); // Cordova needs absolute URL
  Session.set("wk_is_fit",false);
  Uploader.finished = function(index, fileInfo, templateContext) {
    console.log(fileInfo);
    if(fileInfo) {
        console.log("oua");
        Meteor.call('convertToTcx',fileInfo.path, function(e,r){
            console.log(r);
        });
        Meteor.setTimeout(function() {
            Meteor.call('parseTcx',fileInfo.path, function(e,r){
                console.log(r);
                Session.set("wk_is_fit",true);
                Session.set("is_plan_based_wk",true);
                Session.set("wk_distance",r.distance);
                Session.set("wk_duration",r.duration);
                Session.set("wk_time_values",r.time_values);
                Session.set("wk_distance_values",r.distance_values);
                Session.set("wk_elevation_values",r.elevation_values);
                Session.set("wk_power_values",r.power_values);
                Session.set("wk_speed_values",r.speed_values);
                Session.set("wk_cadence_values",r.cadence_values);
            });
        },500);
    }
};
});
