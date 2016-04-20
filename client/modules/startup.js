let startup = () => {
  Meteor.startup(() => {
    GoogleMaps.load({
      key: 'AIzaSyALStwuz3NarVtdaDextjZeuP2PInp0Dtg',
      libraries: 'places'
    });
  });
  _notificationsToaster();
  _setUploader();
  google.charts.load('current', {'packages': ['corechart', 'bar']});
};

var _notificationsToaster = Modules.client.notificationsToaster;

let _setUploader = () => {
  Uploader.uploadUrl = Meteor.absoluteUrl("upload");
  Uploader.finished = function(index, fileInfo, templateContext) {
    if(fileInfo) {
      console.log('uploaded');
      Session.set('fit_processing', true);
      Meteor.call('fit2JSON', "" + fileInfo.path + "");
      console.log('converting...');
      Meteor.setTimeout(() => {
        Meteor.call('parseJSON', function(e,r){
          if(e)
            Meteor.throw(e);
          else {
            Meteor.call('linkFIT', '' + Session.get('workout_id') + '', r);
            Session.set('fit_processing', false);
          }
        });
      }, 2000);
    }
  };
};

Modules.client.startup = startup;
