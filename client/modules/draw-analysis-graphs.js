let lib_loaded = false, isTime = true;
let ppr_data_array = [];

const drawAnalysisGraphs = (ppr, ppr_e) => {
  ppr_data_array = [];
  if(!lib_loaded) {
    google.charts.load('current', {'packages':['corechart']});
    lib_loaded = true;
  }
  _getData(ppr);
  google.charts.setOnLoadCallback(function() {
    _drawChart(ppr_e);
  });
};

function _getData(ppr) {
  ppr_data_array.push(['Plage', 'Puissance maximum']);

  let ppr_slots = [1, 2, 5, 10, 15, 20, 30, 60, 120, 180, 240, 300, 420, 600, 900, 1200, 1800, 2700, 3600, 5400, 7200, 9000, 10800, 12600, 14400, 16200, 18000];

  for(let i in ppr_slots) {
    ppr_data_array.push([ppr_slots[i], ppr['' + ppr_slots[i] + '']]);
  }
}

function _drawChart(ppr_e) {
  let ppr_data = google.visualization.arrayToDataTable(ppr_data_array);

  let ppr_options = {
    hAxis: {title: 'Temps (s)', logScale: true},
    vAxis: {title: 'Puissance maximum (W)'},
    legend: 'none',
    chartArea: {left: "6%", top: "5%", width: '88%', height: '80%'},
    colors: ["black"],
    explorer: {
      maxZoomOut: 2,
      keepInBounds: true
    }
  };

  let ppr_chart = new google.visualization.LineChart(ppr_e);

  ppr_chart.draw(ppr_data, ppr_options);
}


Modules.client.drawAnalysisGraphs = drawAnalysisGraphs;
