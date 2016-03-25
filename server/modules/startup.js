let startup = () => {
  _setEnvironmentVariables();
  _setBrowserPolicies();
  _generateAccounts();
  _fetchStrava();
  Modules.server.configureServices();
};

var _setEnvironmentVariables = () => Modules.server.setEnvironmentVariables();

var _setBrowserPolicies = () => {
  BrowserPolicy.content.allowOriginForAll( '*.cloudfront.net' );
};

var _generateAccounts = () => Modules.server.generateAccounts();

var _fetchStrava = () => Modules.server.fetchStrava();

Modules.server.startup = startup;
