
function drawWorkoutGraphs(xaxis,id,elev_elem, hr_elem) {
  var elev = WorkoutsDB.findOne({_id: id}).elevation_values;
  //var hr = WorkoutsDB.findOne({_id: id}).hr_values;
  if(xaxis == "distance")
    var dist = WorkoutsDB.findOne({_id: id}).distance_values;
  else if(xaxis == "time")
    var dist = WorkoutsDB.findOne({_id: id}).time_values;
  var aredatas=true;
  var elev_data = {
    labels: dist.split(","),
    datasets: [
      {
        fillColor: "rgba(0,169,85,0.2)",
        strokeColor: "rgba(0,169,85,1)",
        pointColor: "rgba(0,0,0,0)",
        pointStrokeColor: "rgba(0,0,0,0)",
        pointHighlightFill: "#000000",
        pointHighlightStroke: "rgba(0,0,0,0)",
        data: elev.split(",")
      }
    ]
  };
  var elev_options = {
    responsive: true,
    animation: false,
    scaleShowGridLines: false,
    pointHitDetectionRadius : 0,
    pointDotRadius : 1,
    tooltipTemplate: "<%if (label){%><%=label/1000%>km : <%}%><%= value %>m",
    scaleBeginAtZero: true,
    showScale: false
};/*
  var hr_data = {
    labels: dist,
    datasets: [
      {
        label: "Fréquence cardiaque",
        fillColor: "rgba(235,61,61,0.2)",
        strokeColor: "rgba(235,61,61,1)",
        pointColor: "rgba(0,0,0,0)",
        pointStrokeColor: "rgba(0,0,0,0)",
        pointHighlightFill: "#000000",
        pointHighlightStroke: "rgba(0,0,0,0)",
        data: hr
      }
    ]
  };
  var hr_options = {
    responsive: true,
    animation: false,
    scaleShowGridLines: false,
    pointHitDetectionRadius : 0,
    pointDotRadius : 1,
    tooltipTemplate: "<%if (label){%><%=label%>km : <%}%><%= value %>bpm",
    showScale: false
};*/

  if(elev_elem != null) {
    var elev_e = elev_elem.getContext("2d");
    var elevChart = new Chart(elev_e).Line(elev_data, elev_options);
  }
  /*if(hr_elem != null) {
    var hr_e = hr_elem.getContext("2d");
    var hrChart = new Chart(hr_e).Line(hr_data, hr_options);
}*/
}

Template.Workout.onRendered(function() {
    var elev_e = this.find('.elev_chart');
    //var hr_e = t.data.hrvalues ? t.find('.hr_chart') : null;
    drawWorkoutGraphs("distance",this.data._id,elev_e,null);
});

Template.Workout.helpers({
    dispMins: function(min) {
        var h = parseInt(min/60) < 10 ? "0" + parseInt(min/60) : parseInt(min/60);
        var m = min%60 < 10 ? "0" + (min%60) : (min%60)
        return h + ":" + m;
    },
    isTrainer: function(){ return Meteor.user().profile === "trainer";},
    getPercentAndColor : function(c) {
        var color = c < 3 ? "green" : c < 7 ? "orange" : "red";
        var percent = c > 0 && c < 11 ? c*10 : 10;
        return percent + " " + color+"-circle";
    },
    getPercentAndColorReverse : function(c) {
        var color = c < 3 ? "red" : c < 7 ? "orange" : "green";
        var percent = c > 0 && c < 11 ? c*10 : 10;
        return percent + " " + color+"-circle";
    }
});

Template.Workout.events({
    "click #delete_bt" : function (e,t) {
        WorkoutsDB.remove(t.find(".wkid").innerHTML);
        document.location = "/workouts";
    }
});
