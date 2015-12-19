  Template.SignupForm.events({
    'submit #register-form' : function(e, t) {
      e.preventDefault();
      var username = t.find('#account_username').value
        , password = t.find('#account_password').value
        , email = t.find('#account_email').value
        , pro = t.find('#athlete_radio').checked;

        // Trim and validate the input

      Accounts.createUser({username: username, email: email , password : password}, function(err){
          if (err) {
            // Inform the user that account creation failed
              alert(err.reason);
          } else {
            ColorsDB.insert({username: username, background: "#03A9F4"});
          }

        });

      return false;
    },
    'click #signup_button' : function(e, t) {
      e.preventDefault();

      var username = t.find('#account_username').value
        , password = t.find('#account_password').value, email = t.find('#account_email').value
        , pro = t.find('#athlete_radio').checked ? "athlete" : "trainer";
;

        // Trim and validate the input

      Accounts.createUser({username: username, email: email , password : password, profile: pro}, function(err){
          if (err) {
            // Inform the user that account creation failed
              alert(err.reason);
          } else {
            // Success. Account has been created and the user
            ColorsDB.insert({username: username, background: "#03A9F4"});
            // has logged in successfully.
              if(pro === "athlete")
                AthletesDB.insert({username: username});
              else
                TrainersDB.insert({username: username});
              Router.go('/');
          }

        });

      return false;
    }
  });
