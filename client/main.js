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

Router.route('/trainer', function () {
      this.render('MyTrainer');
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
    if(Meteor.user()) {
      this.render('Workout', {
          data: function() { return WorkoutsDB.findOne({"_id":this.params.id})}
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
  Uploader.finished = function(index, fileInfo, templateContext) {
    Meteor.call('convertToTcx',fileInfo.path, function(e,r){
        console.log(r);
    });
    Meteor.setTimeout(function() {
        Meteor.call('parseTcx',fileInfo.path, function(e,r){
            console.log(r);
            Session.set("is_plan_based_wk",true);
            Session.set("wk_distance",r.distance);
            Session.set("wk_duration",r.duration);
        });
    },500);
};
});


WorkoutsDB = new Mongo.Collection("workouts");
PlansDB = new Mongo.Collection("plans");
AthletesDB = new Mongo.Collection("athletes");
TrainersDB = new Mongo.Collection("trainers");
NotificationsDB = new Mongo.Collection("notifications");
