let template, form;

let handleAuthentication = (options) => {
  console.log("auieauie");
  template = options.template;
  _handleAuth();
};

let _handleAuth = () => {
  let type = template.createOrSignIn.get();

  if (type === 'create') {
    let profile = {};
    let email = template.find(' [name="emailCreate"]').value,
      password = template.find('[name="passwordCreate"]').value,
      username = template.find('[name="usernameCreate"]').value;
    profile.complete_name = template.find('[name="completeNameCreate"]').value;
    profile.trainer = template.find('#trainer_radio').checked;
    profile.athlete = template.find('#athlete_radio').checked;
    _createUser(email, password, username, profile, 'Vous avez été automatiquement connecté.');
  } else {
    let email = template.find(' [name="emailLogin"]').value,
      password = template.find('[name="passwordLogin"]').value;
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
