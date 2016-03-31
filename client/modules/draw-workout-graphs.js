let lib_loaded = false, isTime = true;
    elevation_data_array = [], power_data_array = [], speed_data_array = [], cadence_data_array = [], heart_rate_data_array = [];

const drawWorkoutGraphs = (wk, elevation_e, power_e, speed_e, cadence_e, heart_rate_e) => {
  if(!lib_loaded) {
    google.charts.load('current', {'packages': ['corechart', 'bar']});
    lib_loaded = true;
  }
  _getWorkoutData(wk);
  google.charts.setOnLoadCallback(function() {
    _drawChart(elevation_e, power_e, speed_e, cadence_e, heart_rate_e);
  });
};

function _getWorkoutData(wk) {
  let x_axis_type = Session.get("x_axis");
  isTime = x_axis_type === "time";
  let x_axis;
  if (isTime)
    x_axis = wk.time.values;
  else
    x_axis = wk.distance.values;
  for (let i in x_axis) {
    x_axis[i] = parseInt(x_axis[i]) || 0;
  }
  for (let i = 0; i < wk.power.values.length; i++) {
    wk.power.values[i] = parseInt(wk.power.values[i]) || 0;
    wk.elevation.values[i] = parseInt(wk.elevation.values[i]) || 0;
    wk.cadence.values[i] = parseInt(wk.cadence.values[i]) || 0;
    wk.speed.values[i] = parseInt(wk.speed.values[i]) || 0;
    wk.heart_rate.values[i] = parseInt(wk.heart_rate.values[i]) || 0;
  }
  elevation_data_array.push([isTime ? 'Temps' : 'Distance', 'Altitude']);
  power_data_array.push([isTime ? 'Temps' : 'Distance', 'Puissance']);
  speed_data_array.push([isTime ? 'Temps' : 'Distance', 'Vitesse']);
  cadence_data_array.push([isTime ? 'Temps' : 'Distance', 'Cadence']);
  heart_rate_data_array.push([isTime ? 'Temps' : 'Distance', 'Fréquence cardiaque']);

  for (let i = 0; i < x_axis.length; i++) {
    elevation_data_array.push([x_axis[i], wk.elevation.values[i]]);
    power_data_array.push([x_axis[i], wk.power.values[i]]);
    speed_data_array.push([x_axis[i], wk.speed.values[i]]);
    cadence_data_array.push([x_axis[i], wk.cadence.values[i]]);
    heart_rate_data_array.push([x_axis[i], wk.heart_rate.values[i]]);
  }
}

function _drawChart(elevation_e, power_e, speed_e, cadence_e, heart_rate_e) {
  let elevation_data = google.visualization.arrayToDataTable(elevation_data_array);
  let power_data = google.visualization.arrayToDataTable(power_data_array);
  let speed_data = google.visualization.arrayToDataTable(speed_data_array);
  let cadence_data = google.visualization.arrayToDataTable(cadence_data_array);
  let heart_rate_data = google.visualization.arrayToDataTable(heart_rate_data_array);

  let elevation_options = {
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

  let power_options = {
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

  let speed_options = {
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

  let cadence_options = {
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

  let heart_rate_options = {
    hAxis: {title: isTime ? 'Temps (s)' : 'Distance (m)'},
    vAxis: {title: 'Fréquence cardiaque (bpm)'},
    legend: 'none',
    chartArea: {left: "6%", top: "5%", width: '88%', height: '80%'},
    colors: ["#E91E63"],
    explorer: {
      maxZoomOut: 2,
      keepInBounds: true
    }
  };

  let elevation_chart = new google.visualization.AreaChart(elevation_e);
  let power_chart = new google.visualization.AreaChart(power_e);
  let speed_chart = new google.visualization.AreaChart(speed_e);
  let cadence_chart = new google.visualization.AreaChart(cadence_e);
  let heart_rate_chart = new google.visualization.AreaChart(heart_rate_e);

  elevation_chart.draw(elevation_data, elevation_options);
  power_chart.draw(power_data, power_options);
  speed_chart.draw(speed_data, speed_options);
  cadence_chart.draw(cadence_data, cadence_options);
  heart_rate_chart.draw(heart_rate_data, heart_rate_options);
}


Modules.client.drawWorkoutsGraphs = drawWorkoutGraphs;
