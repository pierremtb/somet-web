Meteor.methods({
  fit2JSON(path) {
    check(path, String);
    let exec = Npm.require('child_process').exec;

    // Deployed
    //exec('cat \"../../.uploads' + path + '\" | assets/app/jre/bin/java -jar \"./assets/app/FitToJson.jar\" > output.json');

    // Local
    exec('cat \"../../../../../.uploads' + path + '\" ' + '| java -jar \"./assets/app/FitToJson.jar\" > output.json');

    return 'Converted, waiting for parser...';
  },
  parseJSON() {
    let fs = Meteor.npmRequire('fs');
    let txt = fs.readFileSync('output.json', 'utf8');
    let data = JSON.parse(txt);
    let info = data.sessions[0];
    let rec = data.records;
    let start_date = new Date(rec[0].timestamp.replace(' CET', ''));
    let time_values = [], distance_values = [], elevation_values = [], speed_values = [], cadence_values = [], hr_values = [], power_values = [];
    for (let i in rec) {
      time_values.push((Date.parse(rec[i].timestamp.replace(' CET', '')) - start_date) / 1000);
      distance_values.push(parseInt(rec[i].distance));
      elevation_values.push(rec[i].altitude);
      speed_values.push(rec[i].speed * 3.6);
      cadence_values.push(rec[i].cadence);
      hr_values.push(rec[i].hr);
      power_values.push(rec[i].power);
    }
    return {
      calories: info.totalCalories,
      sport: info.sport,
      cadence: {
        avg: info.avgCadence,
        max: info.maxCadence,
        values: cadence_values
      },
      speed: {
        avg: info.avgSpeed * 3.6,
        max: info.maxSpeed * 3.6,
        values: speed_values
      },
      power: {
        avg: info.avgPower,
        max: info.maxPower,
        values: power_values
      },
      distance: {
        total: info.totalDistance,
        values: distance_values
      },
      elevation: {
        ascent: info.totalAscent,
        descent: info.totalDescent,
        values: elevation_values,
      },
      time: {
        start_date: start_date,
        duration: parseInt(info.totalElapsedTime),
        values: time_values
      },
      heart_rate: {
        avg: info.avgHeartRate,
        max: info.maxHeartRate,
        values: hr_values
      }
    };
  },
  linkFIT(id, fit_values) {
    check(id, String);
    check(fit_values, Object);

    WorkoutsDB.update(id, {$set : {fit_linked: true, fit_values: fit_values}});
  }
});
