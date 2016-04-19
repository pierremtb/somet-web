Meteor.methods({
  fit2JSON(path) {
    check(path, String);
    let exec = Npm.require('child_process').exec;

    // Deployed
    exec('cat \"../../.uploads' + path + '\" | assets/app/jre/bin/java -jar \"./assets/app/FitToJson.jar\" > output.json');

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
    let start_date = Date.parse(rec[0].timestamp.replace(' CET', '')) ? Date.parse(rec[0].timestamp.replace(' CET', '')) : Date.parse(rec[0].timestamp.replace(' CEST', ''));
    let time_values = [], distance_values = [], elevation_values = [], speed_values = [], cadence_values = [], hr_values = [], power_values = [];

    function getAverage(arry) {
      // check if array
      if (!(Object.prototype.toString.call(arry) === '[object Array]')) {
        return 0;
      }
      var sum = 0, count = 0;
      sum = arry.reduce(function (previousValue, currentValue, index, array) {
        if (isFinite(currentValue)) {
          count++;
          return previousValue + parseFloat(currentValue);
        }
        return previousValue;
      }, sum);
      return count ? sum / count : 0;
    };

    for (let i in rec) {
      let current_date = Date.parse(rec[i].timestamp.replace(' CET', '')) ? Date.parse(rec[i].timestamp.replace(' CET', '')) : Date.parse(rec[i].timestamp.replace(' CEST', ''));
      time_values.push((current_date - start_date) / 1000);
      distance_values.push(parseInt(rec[i].distance));
      elevation_values.push(rec[i].altitude);
      speed_values.push(rec[i].speed * 3.6);
      cadence_values.push(rec[i].cadence);
      hr_values.push(rec[i].hr);
      power_values.push(rec[i].power);
    }

    let ppr_slots = [1, 2, 5, 10, 15, 20, 30, 60, 120, 180, 240, 300, 420, 600, 900, 1200, 1800, 2700, 3600, 5400, 7200, 9000, 10800, 12600, 14400, 16200, 18000];
    let ppr = {};

    for (let s in ppr_slots) {
      let s_max = 0;
      if (info.totalElapsedTime > ppr_slots[s]) {
        for (let b in time_values) {
          let lower = true, f = b;
          while (lower) {
            f++;
            if ((time_values[f] - time_values[b]) > ppr_slots[s] || f > time_values.length)
              lower = false;
          }
          let local_max = getAverage(power_values.slice(b, f - 1));
          if (local_max > s_max)
            s_max = local_max;
        }
      }
      ppr['' + ppr_slots[s] + ''] = s_max;
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
        values: power_values,
        ppr: ppr
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

    WorkoutsDB.update(id, {$set: {fit_linked: true, fit_values: fit_values}});
  },
  setThisUserPassword(id, pwd) {
    check(id, String);
    check(pwd, String);
    try {
      Accounts.setPassword(id, pwd, {logout: false});
    } catch(e) { return e;}
    return "Votre mot de passe a bien été mis à jour";

  },
  setThisUserEmail(id, m) {
    check(id, String);
    check(m, String);
    Accounts.addEmail(id, m, true);
  }
});


