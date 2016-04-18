const authenticatedRoutes = FlowRouter.group({
  name: 'authenticated'
});

authenticatedRoutes.route( '/dashboard', {
  name: 'Dashboard',
  action() {
    BlazeLayout.render( 'default', { yield: 'Dashboard' } );
  }
});

FlowRouter.route( '/', {
  triggersEnter: [function(context, redirect) {
    if(Meteor.user())
      redirect('/dashboard');
    else
      redirect('/login')
  }],
  action: function(_params) {
    throw new Error("this should not get called");
  }
});
authenticatedRoutes.route( '/workouts', {
  name: 'Entrainements',
  action() {
    BlazeLayout.render( 'default', { yield: 'Workouts' } );
  }
});

authenticatedRoutes.route( '/plans', {
  name: 'Plans',
  action() {
    BlazeLayout.render( 'default', { yield: 'Plans' } );
  }
});

authenticatedRoutes.route( '/events', {
  name: 'Evénements',
  action() {
    BlazeLayout.render( 'default', { yield: 'Events' } );
  }
});

authenticatedRoutes.route( '/calendar', {
  name: 'Calendrier',
  action() {
    BlazeLayout.render( 'default', { yield: 'Calendar' } );
  }
});

authenticatedRoutes.route( '/analysis', {
  name: 'Analyse',
  action() {
    BlazeLayout.render( 'default', { yield: 'Analysis' } );
  }
});

authenticatedRoutes.route( '/settings', {
  name: 'Paramètres',
  action() {
    BlazeLayout.render( 'default', { yield: 'Settings' } );
  }
});

authenticatedRoutes.route( '/workout/:id', {
  name: 'Entrainement',
  action() {
    BlazeLayout.render( 'default', { yield: 'Workout'} );
  },
  subscriptions(params, queryParams) {
    this.register('workout', Meteor.subscribe('workoutOfThisId', params.id));
  }
});

authenticatedRoutes.route( '/plan/new', {
  name: 'Nouvel Entrainement',
  action() {
    BlazeLayout.render( 'default', { yield: 'Plan'} );
  }
});

authenticatedRoutes.route( '/plan/:id', {
  name: 'Plan',
  action() {
    BlazeLayout.render( 'default', { yield: 'Plan' } );
  },
  subscriptions(params, queryParams) {
    this.register('plan', Meteor.subscribe('planOfThisId', params.id));
  }
});

authenticatedRoutes.route( '/plan/:id/edit', {
  name: 'Plan Edit',
  action() {
    BlazeLayout.render( 'default', { yield: 'Plan' } );
  },
  subscriptions(params, queryParams) {
    this.register('plan', Meteor.subscribe('planOfThisId', params.id));
  }
});

authenticatedRoutes.route( '/event/:id', {
  name: 'Evenement',
  action() {
    BlazeLayout.render( 'default', { yield: 'Event' } );
  },
  subscriptions(params, queryParams) {
    this.register('event', Meteor.subscribe('eventOfThisId', params.id));
  }
});

authenticatedRoutes.route( '/event/:id/edit', {
  name: 'Evenement',
  action() {
    BlazeLayout.render( 'default', { yield: 'Event' } );
  },
  subscriptions(params, queryParams) {
    this.register('event', Meteor.subscribe('eventOfThisId', params.id));
  }
});

authenticatedRoutes.route( '/event/new', {
  name: 'Nouvel Evenement',
  action() {
    BlazeLayout.render( 'default', { yield: 'Event' } );
  }
});
