Meteor.startup(function() {
  wk = new ReactiveVar();
  pl = new ReactiveVar();
  Uploader.uploadUrl = Meteor.absoluteUrl("upload"); // Cordova needs absolute URL
  Session.set("wk_is_fit",false);
  Uploader.finished = function(index, fileInfo, templateContext) {
    if(fileInfo) {
        Meteor.call('convertToTcx',fileInfo.path, function(e,r){
            console.log(r);
        });
        Meteor.setTimeout(function() {
            Meteor.call('parseTcx',fileInfo.path, function(e,r){
                console.log(r);
                Session.set("wk_is_fit",true);
                Session.set("is_plan_based_wk",true);
                Session.set("wk_distance",r.distance);
                Session.set("wk_duration",r.duration);
                Session.set("wk_time_values",r.time_values);
                Session.set("wk_distance_values",r.distance_values);
                Session.set("wk_elevation_values",r.elevation_values);
                Session.set("wk_power_values",r.power_values);
                Session.set("wk_speed_values",r.speed_values);
                Session.set("wk_cadence_values",r.cadence_values);
            });
        },1000);
    }
};
});
