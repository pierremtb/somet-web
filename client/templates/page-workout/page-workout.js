/*
function drawWorkoutGraphs(xaxis,id,elev_elem, hr_elem) {
  var elev = WorkoutsDB.findOne({_id: id}).elevvalues;
  var hr = WorkoutsDB.findOne({_id: id}).hrvalues;
  if(xaxis == "distance")
    var dist = WorkoutsDB.findOne({_id: id}).distancevalues;
  else if(xaxis == "time")
    var dist = WorkoutsDB.findOne({_id: id}).timevalues;
  var aredatas=true;
  var elev_data = {
    labels: dist,
    datasets: [
      {
        fillColor: "rgba(0,169,85,0.2)",
        strokeColor: "rgba(0,169,85,1)",
        pointColor: "rgba(0,0,0,0)",
        pointStrokeColor: "rgba(0,0,0,0)",
        pointHighlightFill: "#000000",
        pointHighlightStroke: "rgba(0,0,0,0)",
        data: elev
      }
    ]
  };
  var elev_options = {
    responsive: true,
    animation: false,
    scaleShowGridLines: false,
    pointHitDetectionRadius : 0,
    pointDotRadius : 1,
    tooltipTemplate: "<%if (label){%><%=label%>km : <%}%><%= value %>m",
    scaleBeginAtZero: true,
    showScale: false
  };
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
  };
  if(elev_elem != null) {
    var elev_e = elev_elem.getContext("2d");
    var elevChart = new Chart(elev_e).Line(elev_data, elev_options);
  }
  if(hr_elem != null) {
    var hr_e = hr_elem.getContext("2d");
    var hrChart = new Chart(hr_e).Line(hr_data, hr_options);
  }
}

Template.Workout.onRendered(function() {
  //  drawHRGraph(this.data.id,this);
});

Template.Workout.events({
  "click .collapsible-header" : function(e,t){
    var elev_e = t.data.elevvalues ? t.find('.elev_chart') : null;
    var hr_e = t.data.hrvalues ? t.find('.hr_chart') : null;
    drawWorkoutGraphs("distance",t.data.id,elev_e,hr_e);
  }
});

Template.Workout.helpers({
  duration: function() {
    var hours = parseInt(this.length) < 10 ? "0" + parseInt(this.length) : parseInt(this.length);
    var hours_part = this.length - hours;
    var minutes = parseInt(hours_part * 60) < 10 ? "0" + parseInt(hours_part * 60) : parseInt(hours_part * 60);
    var minutes_part = hours_part * 60 - minutes;
    var seconds = parseInt(minutes_part * 60) < 10 ? "0" + parseInt(minutes_part * 60) : parseInt(minutes_part * 60) ;
    return hours + ":" + minutes + ":" + seconds;
  }
});*/

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
