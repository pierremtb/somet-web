Router.route('/workouts', function () {
    if(Meteor.user()) {
      this.render('Workouts');
    }
    else {
        Router.go('/');
    }
});

Router.route('/plans', function () {
    if(Meteor.user()) {
      this.render('Plans');
    }
    else {
        Router.go('/');
    }
});

Router.route('/signup', function () {
      this.render('Signup');
});

Router.route('/settings', function () {
    if(Meteor.user()) {
      this.render('Settings');
    }
    else {
        Router.go('/');
    }
});

Router.route('/calendar', function () {
    if(Meteor.user()) {
      this.render('Calendar');
    }
    else {
        Router.go('/');
    }
});

Router.route('/analysis', function () {
    if(Meteor.user()) {
      this.render('Analysis');
    }
    else {
        Router.go('/');
    }
});


Router.route('/', function () {
  if(Meteor.user()) {
    this.render('Dashboard');
  } else {
     this.render('Login');
  }
});

Router.route('/workout/:id', function() {
    if(Meteor.user()) {
      this.render('Workout', {
          data: function() { return ReactiveMethod.call("getThisWk",this.params.id); }
      });
    } else {
       this.render('Login');
    }
});

Router.route('/plan/:id', function() {
    if(Meteor.user()) {
      this.render('Plan', {
          data: function() {
              Meteor.call("getThisPl",this.params.id,function(e,r) {
                 pl.set(r);
              });
              return pl.get();
          }
      });
    } else {
       this.render('Login');
    }
});

Meteor.startup(function() {
  wk = new ReactiveVar();
  pl = new ReactiveVar();
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
        },1000);
    }
};
});
