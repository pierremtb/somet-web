Template.Login.onCreated( () => {
  Tracker.autorun(function () {
    let template = Template.instance();
    template.createOrSignIn = new ReactiveVar();
  });
});

Template.Login.onRendered( () => {

});

Template.Login.events({
  'click [data-social-login]' ( event, template ) {
    const service = event.target.getAttribute( 'data-social-login' ),
      options = {
        requestPermissions: [ 'email' ]
      };

    Meteor[ service ]( options, ( error ) => {
      if ( error ) {
        Materialize.toast( error.message );
      }
    });
  },
  'click [data-auth-type]' ( event, template ) {
    let type = event.target.getAttribute( 'data-auth-type' );
    template.createOrSignIn.set( type );
    Modules.client.handleAuthentication({
      form: type == "create" ? '#signup-with-email' : '#login-with-email',
      template: Template.instance()
    });
  },
  'submit form' ( event ) {
    event.preventDefault();
  }
});
