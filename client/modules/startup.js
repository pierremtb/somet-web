let startup = () => {
  _notificationsToaster();
};

var _notificationsToaster = Modules.client.notificationsToaster;

Modules.client.startup = startup;
