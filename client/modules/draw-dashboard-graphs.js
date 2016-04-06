const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Décembre"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let wks_month_data = [], supports_month_data = {};

let lib_loaded = false;

const drawDashBoardGraphs = (me, graph_date, e_d, e_s) => {
  _getWorkoutsDurationsData(me, graph_date);
  _getWorkoutsSupportsData(me, graph_date);
  _drawMonthGraph(e_d,e_s);
};

function _getWorkoutsDurationsData(me, graph_date) {
  wks_month_data = [];
  let graph_date_date = new Date(graph_date.year, graph_date.month, 1);
  let works = WorkoutsDB.find({
      owner: me,
      start_date: {$gt: _getMonthStart(graph_date_date), $lt: _getMonthEnd(graph_date_date)}
    }, {sort: {start_date: 1}}).fetch(),
    temp, workouts = [], days = [], fin = [];

  for (let i in works) {
    workouts.push(works[i].duration / 3600);
    days.push(works[i].start_date.getDate());
  }

  let daysinmonth = _getDaysInMonth(graph_date);

  wks_month_data.push(['Jour', 'Durée']);
  for (let i in daysinmonth) {
    temp = days.indexOf(daysinmonth[i]);
    if (temp == -1)
      wks_month_data.push([daysinmonth[i], 0]);
    else
      wks_month_data.push([daysinmonth[i], workouts[temp]]);
  }
}

function _getWorkoutsSupportsData(me, graph_date) {
  let graph_date_date = new Date(graph_date.year, graph_date.month, 1);
  supports_month_data = {
    mtbs: WorkoutsDB.find({
      owner: me,
      start_date: {$gt: _getMonthStart(graph_date_date), $lt: _getMonthEnd(graph_date_date)},
      support: "mtb"
    }).fetch().length,
    roads: WorkoutsDB.find({
      owner: me,
      start_date: {$gt: _getMonthStart(graph_date_date), $lt: _getMonthEnd(graph_date_date)},
      support: "road"
    }).fetch().length,
    hts: WorkoutsDB.find({
      owner: me,
      start_date: {$gt: _getMonthStart(graph_date_date), $lt: _getMonthEnd(graph_date_date)},
      support: "ht"
    }).fetch().length,
    runs: WorkoutsDB.find({
      owner: me,
      start_date: {$gt: _getMonthStart(graph_date_date), $lt: _getMonthEnd(graph_date_date)},
      support: "run"
    }).fetch().length,
    swims: WorkoutsDB.find({
      owner: me,
      start_date: {$gt: _getMonthStart(graph_date_date), $lt: _getMonthEnd(graph_date_date)},
      support: "swim"
    }).fetch().length,
    endrs: WorkoutsDB.find({
      owner: me,
      start_date: {$gt: _getMonthStart(graph_date_date), $lt: _getMonthEnd(graph_date_date)},
      support: "endr"
    }).fetch().length,
    skixs: WorkoutsDB.find({
      owner: me,
      start_date: {$gt: _getMonthStart(graph_date_date), $lt: _getMonthEnd(graph_date_date)},
      support: "skix"
    }).fetch().length,
    othrs: WorkoutsDB.find({
      owner: me,
      start_date: {$gt: _getMonthStart(graph_date_date), $lt: _getMonthEnd(graph_date_date)},
      support: "othr"
    }).fetch().length
  };
}

function _drawMonthGraph(e_d, e_s) {
  google.charts.setOnLoadCallback(function() {
    _drawChartWkMonth(e_d);
    _drawChartRepart(e_s);
  });
}

function _getMonthStart(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function _getMonthEnd(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

function _getDaysInMonth(graph_date) {
  let date = new Date(graph_date.year, graph_date.month, 1);
  let days = [];
  while (date.getMonth() === graph_date.month) {
    days.push(new Date(date).getDate());
    date.setDate(date.getDate() + 1);
  }
  return days;
}

function _drawChartWkMonth(e) {
  let data_wks_month = google.visualization.arrayToDataTable(wks_month_data);

  let options_wks_month = {
    colors: ["#ec407a"],
    legend: {position: 'none'}
  };

  let chart_wk_month = new google.charts.Bar(e);

  chart_wk_month.draw(data_wks_month, options_wks_month);
}

function _drawChartRepart(e) {
  let data_repart = google.visualization.arrayToDataTable([
    ['Sport', 'Nombre par mois'],
    ['VTT', supports_month_data.mtbs],
    ['Route', supports_month_data.roads],
    ['Course à pied', supports_month_data.runs],
    ['Home Trainer', supports_month_data.hts],
    ['Natation', supports_month_data.swims],
    ['Enduro', supports_month_data.endrs],
    ['Ski de fond', supports_month_data.skixs],
    ['Autre', supports_month_data.othrs]
  ]);

  let options_repart = {
    pieHole: 0.2,
    colors: ["#ec407a", "#26a69a", "#29b6f6", "#5c6bc0", "#ef5350", "#66bb6a", "#ffee58", "#78909c"],
    legend: {
      position: 'bottom'
    },
    chartArea: {top: 0, width: "90%", left: "5%"}
  };

  let chart_repart = new google.visualization.PieChart(e);

  chart_repart.draw(data_repart, options_repart);
}

Modules.client.drawDashboardGraphs = drawDashBoardGraphs;
