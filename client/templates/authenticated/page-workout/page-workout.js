function getPercentAndColor(c) {
  var color = c < 3 ? "green" : c < 7 ? "orange" : "red";
  var percent = c > 0 && c < 11 ? c * 10 : 10;
  return percent + " " + color + "-circle";
}

function getCRBackColor(c) {
  return c < 3 ? "#A5D6A7" : c < 7 ? "#FFF59D" : "#EF9A9A";
}

function getCRFrontColor(c) {
  return c < 3 ? "#4CAF50" : c < 7 ? "#FFEB3B" : "#F44336";
}
function getCRBackColorRev(c) {
  return c < 3 ? "#EF9A9A" : c < 7 ? "#FFF59D" : "#A5D6A7";
}

function getCRFrontColorRev(c) {
  return c < 3 ? "#F44336" : c < 7 ? "#FFEB3B" : "#4CAF50";
}
function getPercentAndColorReverse(c) {
  var color = c < 3 ? "red" : c < 7 ? "orange" : "green";
  var percent = c > 0 && c < 11 ? c * 10 : 10;
  return percent + " " + color + "-circle";
}


function drawWorkoutGraphs(wk, elevation_e, power_e) {
  var x_axis_type = Session.get("x_axis");
  var isTime = x_axis_type === "time";
  var x_axis;
  if (isTime)
    x_axis = wk.time_values;
  else
    x_axis = wk.distance_values;
  for (var i in x_axis) {
    x_axis[i] = parseInt(x_axis[i]) || 0;
  }
  for (i = 0; i < wk.power_values.length; i++) {
    wk.power_values[i] = parseInt(wk.power_values[i]) || 0;
    wk.elevation_values[i] = parseInt(wk.elevation_values[i]) || 0;
    wk.cadence_values[i] = parseInt(wk.cadence_values[i]) || 0;
    wk.speed_values[i] = parseInt(wk.speed_values[i]) || 0;
  }
  var elevation_data_array = [], power_data_array = [], speed_data_array = [], cadence_data_array = [];
  elevation_data_array.push([isTime ? 'Temps' : 'Distance', 'Altitude']);
  power_data_array.push([isTime ? 'Temps' : 'Distance', 'Puissance']);
  speed_data_array.push([isTime ? 'Temps' : 'Distance', 'Vitesse']);
  cadence_data_array.push([isTime ? 'Temps' : 'Distance', 'Cadence']);

  for (i = 0; i < x_axis.length; i++) {
    elevation_data_array.push([x_axis[i], wk.elevation_values[i]]);
    power_data_array.push([x_axis[i], wk.power_values[i]]);
    speed_data_array.push([x_axis[i], wk.speed_values[i]]);
    cadence_data_array.push([x_axis[i], wk.cadence_values[i]]);
  }

  function drawChart() {
    var elevation_data = google.visualization.arrayToDataTable(elevation_data_array);
    var power_data = google.visualization.arrayToDataTable(power_data_array);
    var speed_data = google.visualization.arrayToDataTable(speed_data_array);
    var cadence_data = google.visualization.arrayToDataTable(cadence_data_array);

    var elevation_options = {
      hAxis: {title: isTime ? 'Temps (s)' : 'Distance (m)'},
      vAxis: {title: 'Altitude (m)'},
      legend: 'none',
      colors: ['#4CAF50'],
      chartArea: {left: "6%", top: "5%", width: '88%', height: '80%'},
      explorer: {
        maxZoomOut: 2,
        keepInBounds: true
      }
    };

    var power_options = {
      hAxis: {title: isTime ? 'Temps (s)' : 'Distance (m)'},
      vAxis: {title: 'Puissance (W)'},
      legend: 'none',
      chartArea: {left: "6%", top: "5%", width: '88%', height: '80%'},
      colors: ["#FF5722"],
      explorer: {
        maxZoomOut: 2,
        keepInBounds: true
      }
    };

    var speed_options = {
      hAxis: {title: isTime ? 'Temps (s)' : 'Distance (m)'},
      vAxis: {title: 'Vitesse (km/h)'},
      legend: 'none',
      chartArea: {left: "6%", top: "5%", width: '88%', height: '80%'},
      colors: ["#2196F3"],
      explorer: {
        maxZoomOut: 2,
        keepInBounds: true
      }
    };

    var cadence_options = {
      hAxis: {title: isTime ? 'Temps (s)' : 'Distance (m)'},
      vAxis: {title: 'Cadence (tpm)'},
      legend: 'none',
      chartArea: {left: "6%", top: "5%", width: '88%', height: '80%'},
      colors: ["#3F51B5"],
      explorer: {
        maxZoomOut: 2,
        keepInBounds: true
      }
    };

    var elevation_chart = new google.visualization.AreaChart(document.getElementById("elevation_chart"));
    var power_chart = new google.visualization.AreaChart(document.getElementById("power_chart"));
    var speed_chart = new google.visualization.AreaChart(document.getElementById("speed_chart"));
    var cadence_chart = new google.visualization.AreaChart(document.getElementById("cadence_chart"));

    elevation_chart.draw(elevation_data, elevation_options);
    power_chart.draw(power_data, power_options);
    speed_chart.draw(speed_data, speed_options);
    cadence_chart.draw(cadence_data, cadence_options);
  }

  google.load('visualization', '1.0', {'packages': ['corechart'], callback: drawChart});
  return 0;
}

Template.Workout.onCreated(function () {
  wk = new ReactiveVar({});
});

Template.Workout.onRendered(function () {
  var self = this;
  var done = false;
  Tracker.autorun(function () {
    if (FlowRouter.subsReady() && !done) {
      if(WorkoutsDB.findOne()) {
        wk.set(WorkoutsDB.findOne());
        done = true;
        var ec = self.find('.elevation_chart'),
          pc = self.find('.power_chart'),
          sc = self.find('.speed_chart'),
          cc = self.find('.cadence_chart');
        if (wk.get().fit_linked)
          drawWorkoutGraphs(self.workout.get(), ec, pc, sc, cc);
        $(document).ready(function () {
          var circle_crten_eff = Circles.create({
            id: 'circle_crten_eff',
            radius: 30,
            value: wk.get().cr.effort,
            maxValue: 10,
            width: 5,
            text: function (value) {
              return value;
            },
            colors: [getCRBackColor(wk.get().cr.effort), getCRFrontColor(wk.get().cr.effort)],
            duration: null,
            wrpClass: 'circles-wrp',
            textClass: 'circles-text',
            valueStrokeClass: 'circles-valueStroke',
            maxValueStrokeClass: 'circles-maxValueStroke',
            styleWrapper: true,
            styleText: true
          });
          var circle_crten_ple = Circles.create({
            id: 'circle_crten_ple',
            radius: 30,
            value: wk.get().cr.pleasure,
            maxValue: 10,
            width: 5,
            text: function (value) {
              return value;
            },
            colors: [getCRBackColorRev(wk.get().cr.pleasure), getCRFrontColorRev(wk.get().cr.pleasure)],
            duration: null,
            wrpClass: 'circles-wrp',
            textClass: 'circles-text',
            valueStrokeClass: 'circles-valueStroke',
            maxValueStrokeClass: 'circles-maxValueStroke',
            styleWrapper: true,
            styleText: true
          });
          var sensa = Circles.create({
            id: 'sensa',
            radius: 30,
            value: wk.get().cr.sensations,
            maxValue: 10,
            width: 5,
            text: function (value) {
              return value;
            },
            colors: [getCRBackColorRev(wk.get().cr.sensations), getCRFrontColorRev(wk.get().cr.sensations)],
            duration: null,
            wrpClass: 'circles-wrp',
            textClass: 'circles-text',
            valueStrokeClass: 'circles-valueStroke',
            maxValueStrokeClass: 'circles-maxValueStroke',
            styleWrapper: true,
            styleText: true
          });
          var hum = Circles.create({
            id: 'hum',
            radius: 30,
            value: wk.get().cr.mood,
            maxValue: 10,
            width: 5,
            text: function (value) {
              return value;
            },
            colors: [getCRBackColorRev(wk.get().cr.mood), getCRFrontColorRev(wk.get().cr.mood)],
            duration: null,
            wrpClass: 'circles-wrp',
            textClass: 'circles-text',
            valueStrokeClass: 'circles-valueStroke',
            maxValueStrokeClass: 'circles-maxValueStroke',
            styleWrapper: true,
            styleText: true
          });
          $('.modal-trigger').leanModal();
        });
      }
      else {
        FlowRouter.redirect('/dashboard');
      }
    }
  });
});

Template.Workout.helpers({
  isTrainer: function () {
    return Meteor.user().profile === "trainer";
  },
  fitLinked: function () {
    return wk.get().fit_linked;
  },
  title: function () {
    return wk.get().title;
  },
  distance: function () {
    return wk.get().distance;
  },
  description: function () {
    return wk.get().description;
  },
  start_date: function () {
    return wk.get().start_date;
  },
  comments: function () {
    return wk.get().comments;
  },
  cr: function () {
    return wk.get().cr;
  },
  calories: function () {
    return wk.get().calories;
  },
  speed: function () {
    return wk.get().speed;
  },
  cadence: function () {
    return wk.get().cadence;
  },
  ascent: function () {
    return wk.get().ascent;
  },
  descent: function () {
    return wk.get().descent;
  },
  duration: function () {
    return wk.get().duration;
  },
  id: function () {
    return wk.get()._id;
  }
});

Template.Workout.events({
  "click #delete_bt": function (e, t) {
    Meteor.call("rmThisWk", t.find(".wkid").innerHTML);
    document.location = "/workouts";
  },
  "click #x_axis_time": function (e, t) {
    Session.set("x_axis", "time");
    drawWorkoutGraphs(WorkoutsDB.findOne(), t.find('.elevation_chart'), t.find('.power_chart'));
  },
  "click #x_axis_distance": function (e, t) {
    Session.set("x_axis", "distance");
    drawWorkoutGraphs(WorkoutsDB.findOne(), t.find('.elevation_chart'), t.find('.power_chart'));
  }
});
