let startup = () => {
  _setEnvironmentVariables();
  _setBrowserPolicies();
  _generateAccounts();
  _fetchStrava();
  _setUploader();
  Modules.server.configureServices();
};

var _setEnvironmentVariables = () => Modules.server.setEnvironmentVariables();

var _setBrowserPolicies = () => {
  BrowserPolicy.content.allowOriginForAll('*.cloudfront.net');
  BrowserPolicy.content.allowOriginForAll('*.google.com');
  BrowserPolicy.content.allowOriginForAll('*.googleapis.com');
  BrowserPolicy.content.allowOriginForAll('*.gstatic.com');
  BrowserPolicy.content.allowEval();
};

var _generateAccounts = () => Modules.server.generateAccounts();

var _fetchStrava = () => Modules.server.fetchStrava();

var _setUploader = () => {
  Meteor.startup(() => {
    UploadServer.init({
      tmpDir: process.env.PWD + '/.uploads/tmp',
      uploadDir: process.env.PWD + '/.uploads/',
      checkCreateDirectories: true
    });
  });
};

Modules.server.startup = startup;
