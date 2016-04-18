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
    _createUser(email, password, username, profile, 'Vous avez été automatiquement connecté.');
  } else {
    let email = template.find('#username').value,
      password = template.find('#password').value;
    _loginUser(email, password, 'Vous êtes connecté.');
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
      Materialize.toast(error.reason);
    } else {
      Materialize.toast(message);
      if(profile.trainer) {
        Meteor.call("insertTrainer", { username: username, complete_name: profile.complete_name});
      }
      else {
        Meteor.call("insertAthlete", { username: username, complete_name: profile.complete_name});
      }
      _hideModal();
    }
  });
};

let _loginUser = (email, password, message) => {
  console.log(email, password);
  Meteor.loginWithPassword(email, password, (error) => {
    if (error) {
      Materialize.toast(error.reason);
      _hideModal();
    } else {
      Materialize.toast(message);
      _hideModal();
    }
  });
};

let _hideModal = () => {

};

Modules.client.handleAuthentication = handleAuthentication;
