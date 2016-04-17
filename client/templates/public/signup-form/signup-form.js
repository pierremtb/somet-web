Template.SignupForm.events({
  "click .strava": function (e, t) {
    Meteor.loginWithStrava({redirectUrl: "/dashboard"}, function (err) {
      if (err) {
        throw new Meteor.Error("Strava login failed");
      }
      else {
        FlowRouter.go('/dashboard');
      }
    });
  },
  'submit #register-form': function (e, t) {
    e.preventDefault();
    var username = t.find('#account_username').value
      , password = t.find('#account_password').value
      , email = t.find('#account_email').value
      , pro = t.find('#athlete_radio').checked;

    // Trim and validate the input

    Accounts.createUser({username: username, email: email, password: password}, function (err) {
      if (err) {
        // Inform the user that account creation failed
        alert(err.reason);
      } else {
        //ColorsDB.insert({username: username, background: "#03A9F4"});
      }

    });

    return false;
  },
  'click #signup_button': function (e, t) {
    e.preventDefault();

    var username = t.find('#account_username').value
      , password = t.find('#account_password').value, email = t.find('#account_email').value
      , pro = t.find('#athlete_radio').checked ? "athlete" : "trainer";
    ;

    // Trim and validate the input
/*
    Accounts.createUser({username: username, email: email, password: password, profile: pro}, function (err) {
      if (err) {
        alert(err.reason);
      } else {
        Session.set("loginSelected", true);
        if (pro === "athlete")
          Meteor.call("addToAthletesDB", username);
        else
          Meteor.call("addToTrainersDB", username);
        Router.go('/');
      }

    });*/

    return false;
  }
});
