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
                Session.set("wk_avg_speed",r.avg_speed);
                Session.set("wk_max_speed",r.max_speed);
                Session.set("wk_avg_cadence",r.avg_cadence);
                Session.set("wk_max_cadence",r.max_cadence);
                Session.set("wk_ascent",r.ascent);
                Session.set("wk_descent",r.descent);
                Session.set("wk_sport",r.sport);
                Session.set("wk_calories",r.calories);
            });
        },1000);
    }
};
});

Push.debug = true;

Push.allow({
    send: function(userId, notification) {
        // Allow all users to send to everybody - For test only!
        return true;
    }
});
