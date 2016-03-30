const authenticatedRoutes = FlowRouter.group({
  name: 'authenticated'
});

authenticatedRoutes.route( '/', {
  name: 'dashboard',
  action() {
    BlazeLayout.render( 'default', { yield: 'Dashboard' } );
  }
});

authenticatedRoutes.route( '/dashboard', {
  name: 'dashboard',
  action() {
    BlazeLayout.render( 'default', { yield: 'Dashboard' } );
  }
});

authenticatedRoutes.route( '/workouts', {
  name: 'workouts',
  action() {
    BlazeLayout.render( 'default', { yield: 'Workouts' } );
  }
});

authenticatedRoutes.route( '/workouts/:p', {
  name: 'workoutsByPage',
  action() {
    BlazeLayout.render( 'default', { yield: 'Workouts' } );
  },
  subscriptions(params, queryParams) {
    this.register('workoutsByPage', Meteor.subscribe('workoutsOfUsr', params.p));
  }
});

authenticatedRoutes.route( '/plans', {
  name: 'plans',
  action() {
    BlazeLayout.render( 'default', { yield: 'Plans' } );
  }
});

authenticatedRoutes.route( '/events', {
  name: 'events',
  action() {
    BlazeLayout.render( 'default', { yield: 'Events' } );
  }
});

authenticatedRoutes.route( '/calendar', {
  name: 'calendar',
  action() {
    BlazeLayout.render( 'default', { yield: 'Calendar' } );
  }
});

authenticatedRoutes.route( '/analysis', {
  name: 'analyisis',
  action() {
    BlazeLayout.render( 'default', { yield: 'Analysis' } );
  }
});

authenticatedRoutes.route( '/settings', {
  name: 'settings',
  action() {
    BlazeLayout.render( 'default', { yield: 'Settings' } );
  }
});

authenticatedRoutes.route( '/workout/:id', {
  name: 'workout',
  action() {
    BlazeLayout.render( 'default', { yield: 'Workout' } );
  },
  subscriptions(params, queryParams) {
    this.register('workout', Meteor.subscribe('workoutOfThisId', params.id));
  }
});

authenticatedRoutes.route( '/plan/:id', {
  name: 'plan',
  action() {
    BlazeLayout.render( 'default', { yield: 'Plan' } );
  },
  subscriptions(params, queryParams) {
    this.register('plan', Meteor.subscribe('planOfThisId', params.id));
  }
});

authenticatedRoutes.route( '/event/:id', {
  name: 'event',
  action() {
    BlazeLayout.render( 'default', { yield: 'Event' } );
  },
  subscriptions(params, queryParams) {
    this.register('event', Meteor.subscribe('eventOfThisId', params.id));
  }
});
