Template.Login.onCreated( () => {
  Tracker.autorun(function () {
    let template = Template.instance();
    template.createOrSignIn = new ReactiveVar();
  });
  Session.set('signup_mode', false);
});

Template.Login.helpers({
  loggingIn() {
    return Meteor.loggingIn();
  }
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
        Materialize.toast( error.message, 1000);
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
  },
  'click #button_login': function(e,t) {
    if(Session.get('signup_mode')) {
      $('#login_form').removeClass('signup_mode');
      let signup_form = $('#signup_form');
      signup_form.removeClass('signup_mode');
      $('#auth_actions').removeClass('signup_mode');
      $('#button_login').removeClass('signup_mode');
      $('#button_signup').removeClass('signup_mode');
      Session.set('signup_mode', false);
    } else {
      Modules.client.handleAuthentication({
        template: Template.instance()
      });
    }
  },
  'click #button_signup': function(e,t) {
    if (!Session.get('signup_mode')) {
      $('#login_form').addClass('signup_mode');
      $('#signup_form').addClass('signup_mode');
      $('#auth_actions').addClass('signup_mode');
      $('#button_login').addClass('signup_mode');
      $('#button_signup').addClass('signup_mode');
      Session.set('signup_mode', true);
    } else {
      console.log("auiensau");
      Modules.client.handleAuthentication({
        template: Template.instance()
      });
    }
  }
});
