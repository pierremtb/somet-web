let template, form;

let handleAuthentication = (options) => {
  template = options.template;
  _handleAuth();
};

let _handleAuth = () => {
  let type = template.createOrSignIn.get();

  if (type === 'create') {
    let profile = {};
    let email = template.find('#email').value,
      password = template.find('#password').value,
      username = template.find('#username').value;
    profile.complete_name = template.find('complete_name').value,
    profile.trainer = template.find('#type').value == 'trainer';
    _createUser(email, password, username, profile, 'Vous avez été automatiquement connecté');
  } else {
    let email = template.find('#username').value,
      password = template.find('#password').value;
    _loginUser(email, password, 'Vous êtes connecté');
  }
};

let _createUser = (email, password, username, profile, message) => {
  Accounts.createUser({
    email: email,
    password: password,
    username: username,
    profile: profile
  }, (error) => {
    if (error) {
      Materialize.toast(error.reason, 1000);
    } else {
      Materialize.toast(message, 1000);
    }
  });
};

let _loginUser = (email, password, message) => {
  Meteor.loginWithPassword(email, password, (error) => {
    if (error) {
      Materialize.toast(error.reason, 1000);
    } else {
      Materialize.toast(message, 1000);
    }
  });
};

Modules.client.handleAuthentication = handleAuthentication;
