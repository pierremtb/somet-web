var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var date = new Date();

function getPreviousMonday() {
    var prev_m = new Date();
    prev_m.setDate(prev_m.getDate() - date.getDay() + 1);
    return prev_m.getDate() + " " + monthNames[prev_m.getMonth()] + ", " + prev_m.getFullYear();
}

Router.configure({
    layoutTemplate: 'UserLayout',
    loadingTemplate: 'Preloader'
});

Router.route('/workouts', {
    waitOn: function () {
        if (Meteor.user().profile === "trainer") {
            return [
                Meteor.subscribe('workoutsOfMyAthletes'),
                Meteor.subscribe('athletesOfCurrentUser'),
                Meteor.subscribe('notificationsOfCurrentUser')
            ];
        }
        else {
            return [
                Meteor.subscribe('workoutsOfCurrentUser'),
                Meteor.subscribe('plansOfCurrentUser'),
                Meteor.subscribe('athletesOfCurrentUser'),
                Meteor.subscribe('notificationsOfCurrentUser')
            ];
        }
    },

    action: function () {
        if (Meteor.user()) {
            if (this.ready())
                this.render('Workouts');
            else
                Router.go('/');
        }
    }
});

Router.route('/plans', {
    waitOn: function () {
        if (Meteor.user().profile === "trainer") {
            return [
                Meteor.subscribe('plansOfMyAthletes'),
                Meteor.subscribe('notificationsOfCurrentUser'),
                Meteor.subscribe('athletesOfCurrentUser')
            ];
        }
        else {
            return [
                Meteor.subscribe('plansOfCurrentUser'),
                Meteor.subscribe('notificationsOfCurrentUser')
            ];
        }
    },

    action: function () {
        if (Meteor.user()) {
            if (this.ready())
                this.render('Plans');
            else
                Router.go('/');
        }
    }
});

Router.route('/signup', function () {
    this.render('Signup');
});

Router.route('/settings', {
    waitOn: function () {
        if (Meteor.user().profile === "trainer") {
            return [
                Meteor.subscribe('notificationsOfCurrentUser'),
                Meteor.subscribe('allAthletes')
            ];
        }
        else {
            return [
                Meteor.subscribe('notificationsOfCurrentUser'),
                Meteor.subscribe('allTrainers'),
                Meteor.subscribe('allAthletes')
            ];
        }
    },

    action: function () {
        if (Meteor.user()) {
            if (this.ready())
                this.render('Settings');
            else
                Router.go('/');
        }
    }
});

Router.route('/calendar', {
    waitOn: function () {
        if (Meteor.user().profile === "trainer") {
            return [
                Meteor.subscribe('notificationsOfCurrentUser'),
                Meteor.subscribe('athletesOfCurrentUser')
            ];
        }
        else {
            return [
                Meteor.subscribe('notificationsOfCurrentUser')
            ];
        }
    },

    action: function () {
        if (Meteor.user()) {
            if (this.ready())
                this.render('Calendar');
            else
                Router.go('/');
        }
    }
});

Router.route('/analysis', function () {
    if (Meteor.user()) {
        this.render('Analysis');
    }
    else {
        Router.go('/');
    }
});

Router.route('/dashboard', {
    waitOn: function () {
        if (Meteor.user().profile === "trainer") {
            return [
                Meteor.subscribe('workoutsOfMyAthletes'),
                Meteor.subscribe('athletesOfCurrentUser'),
                Meteor.subscribe('notificationsOfCurrentUser'),
                Meteor.subscribe('plansOfMyAthletesForThisWeek', getPreviousMonday())
            ];
        }
        else {
            return [
                Meteor.subscribe('workoutsOfCurrentUser'),
                Meteor.subscribe('athletesOfCurrentUser'),
                Meteor.subscribe('notificationsOfCurrentUser')
            ];
        }
    },

    action: function () {
        if (this.ready())
            this.render('Dashboard');
        else
            this.render('Login');
    }
});

Router.route('/', function () {
    this.render('Login');
});

Router.route('/workout/:id', {
    waitOn: function () {
        return Meteor.subscribe('workoutOfThisId', this.params.id);
    },

    action: function () {
        if (Meteor.user()) {
            if (this.ready())
                this.render('Workout');
            else
                Router.go('/');
        }
    }
});

Router.route('/plan/:id', function () {
    if (Meteor.user()) {
        this.render('Plan', {
            data: function () {
                Meteor.call("getThisPl", this.params.id, function (e, r) {
                    pl.set(r);
                });
                return pl.get();
            }
        });
    } else {
        this.render('Login');
    }
});