
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

Router.route('/', function () {
  if(Meteor.user()) {
    this.render('Dashboard');
  } else {
     this.render('Login');
  }
});


WorkoutsDB = new Mongo.Collection("workouts");
PlansDB = new Mongo.Collection("plans");
AthletesDB = new Mongo.Collection("athletes");
TrainersDB = new Mongo.Collection("trainers");
NotificationsDB = new Mongo.Collection("notifications");