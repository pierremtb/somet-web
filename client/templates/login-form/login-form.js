 Template.LoginForm.events({

    'submit #login-form' : function(e, t){
      e.preventDefault();
      // retrieve the input field values
      var username = t.find('#login_username').value
        , password = t.find('#login_password').value;
        // Trim and validate your fields here.... 

        // If validation passes, supply the appropriate fields to the
        // Meteor.loginWithPassword() function.
        Meteor.loginWithPassword(username, password, function(err){
            if (err) {
                alert(err.reason);
            }
            else {
            }
          });
         return false; 
      },
     'click #login_button' : function(e, t){
      e.preventDefault();
      // retrieve the input field values
      var username = t.find('#login_username').value
        , password = t.find('#login_password').value;
        // Trim and validate your fields here.... 

        // If validation passes, supply the appropriate fields to the
        // Meteor.loginWithPassword() function.
        Meteor.loginWithPassword(username, password, function(err){
            if (err) {
                alert(err.reason);
            }
            else {
            }
          });
         return false; 
      }
  });