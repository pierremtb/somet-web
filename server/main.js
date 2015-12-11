WorkoutsDB = new Mongo.Collection("workouts");
AthletesDB = new Mongo.Collection("athletes");
TrainersDB = new Mongo.Collection("trainers");
NotificationsDB = new Mongo.Collection("notifications");
PlansDB = new Mongo.Collection("plans");
HashesDB = new Mongo.Collection("hashes");

Router.map(function() {

  this.route('new_workout', {
    path: '/api/new_workout',
    where: 'server',
    action: function() {

      // Watch the Meteor log to see this output
      console.log("Hook called.");
      var datas = this.request.body;
    if(datas.passhash == HashesDB.findOne({username : datas.user}).passhash) {
       WorkoutsDB.insert({
          title: datas.title,
          description: datas.description,
          length: datas.length,
          distance: datas.distance,
          crten: datas.crten,
          user: datas.user,
          day: new Date().getDate(),
          month: new Date().getMonth() + 1,
          year: new Date().getFullYear(),
          hrvalues: datas.hrvalues,
	        distancevalues: datas.distancevalues,
          elevvalues: datas.elevvalues
        });
        this.response.writeHead(200, {'Content-Type': 'text/html'});
      this.response.write("0");
    }
     else {
         console.log("Pass incorrect");
        this.response.writeHead(200, {'Content-Type': 'text/html'});
      this.response.write("1");
     }


      // `this.response.end` *must* be called, or else the connection is left open.
      this.response.end("");
    }
  });

});

Meteor.startup(function () {
  UploadServer.init({
    tmpDir: process.env.PWD + '/.uploads/tmp',
    uploadDir: process.env.PWD + '/.uploads/',
    checkCreateDirectories: true //create the directories for you
  });
});

Meteor.methods({
    convertToTcx: function(path) {
        var fs = Meteor.npmRequire('fs');
        var exec = Npm.require('child_process').exec;
        exec("/usr/bin/python ../../../../../python/fittotcx.py \"../../../../../.uploads" + path + "\" > ../../../../../.uploads/sample.tcx");
        return "done";
    },
    parseTcx: function(path) {
        var opts = {};
        opts.elapsed = true;
        var fs = Meteor.npmRequire('fs');
        var tcx = Meteor.npmRequire('tcx-js');
        var parser = new tcx.Parser(opts);
        parser.parse_file("../../../../../.uploads/sample.tcx");
        var activity = parser.activity;
        var creator = activity.creator;
        var author = activity.author;
        var trackpoints = activity.trackpoints;
        var length = trackpoints.length;
        console.log(trackpoints[123]);
        function getValues(s){
            var r = "";
            for(var i=0;i<length-1;i++) {
                r +=  Math.round(parseInt(trackpoints[i][s])) + ",";
            }
            r += trackpoints[length-1][s];
            return r;
        }
        var data = {
            distance : Math.round(parseInt(trackpoints[trackpoints.length-1].dist_meters)/1000),
            duration: Math.round((trackpoints[trackpoints.length-1].elapsed_sec - trackpoints[0].elapsed_sec)/60),
            time_values: getValues("elapsed_sec"),
            distance_values: getValues("dist_meters"),
            elevation_values: getValues("alt_meters"),
            hr_values: getValues("hr"),
            power_values: getValues("bike_power"),
            cadence_values: getValues("bike_cadence")
        }
        return data;
    }
});
