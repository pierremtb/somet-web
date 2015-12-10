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
        var python = Meteor.npmRequire('python-shell');
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
        console.log(trackpoints[10]);
        var length = trackpoints.length;
        var time_values = "";
        for(var i=0;i<length-1;i++) {
            time_values += trackpoints[i].elapsed_sec + ",";
        }
        time_values += trackpoints[length-1].elapsed_sec;
        var data = {
            distance : Math.round(parseInt(trackpoints[trackpoints.length-1].dist_meters)/1000),
            duration: Math.round((trackpoints[trackpoints.length-1].elapsed_sec - trackpoints[0].elapsed_sec)/60),
            time_values: time_values
        }
        return data;
    }
});
