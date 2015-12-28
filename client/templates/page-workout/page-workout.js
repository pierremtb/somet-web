
function drawWorkoutGraphs(wk,elevation_e, power_e) {
    console.log(wk);
    var elevation_values = wk.elevation_values.split(",");
    var power_values = wk.power_values.split(",");
    var speed_values = wk.speed_values.split(",");
    var cadence_values = wk.cadence_values.split(",");
    var x_axis_type = Session.get("x_axis");
    var isTime = x_axis_type === "time";
    var x;
    if(isTime)
        x = wk.time_values;
    else
        x = wk.distance_values;

    var aredatas = true;
    var x_axis = x.split(",");
    for(var i in x_axis) {
        x_axis[i] = parseInt(x_axis[i]) || 0;
    }
    for(i=0;i<power_values.length;i++) {
        power_values[i] = parseInt(power_values[i]) || 0;
    }
    power_values[power_values.length-1] = 0;
    for(i in elevation_values) {
        elevation_values[i] = parseInt(elevation_values[i]) || 0;
    }
    //speed_values[speed_values.length-1] = 0;
    for(i in speed_values) {
        speed_values[i] = parseInt(speed_values[i]) || 0;
    }
    //power_values[power_values.length-1] = 0;
    for(i in cadence_values) {
        cadence_values[i] = parseInt(cadence_values[i]) || 0;
    }
    var elevation_data_array = [], power_data_array = [], speed_data_array = [], cadence_data_array = [];
    elevation_data_array.push([isTime ? 'Temps' : 'Distance','Altitude']);
    power_data_array.push([isTime ? 'Temps' : 'Distance','Puissance']);
    speed_data_array.push([isTime ? 'Temps' : 'Distance','Vitesse']);
    cadence_data_array.push([isTime ? 'Temps' : 'Distance','Cadence']);
    for(i=0;i<x_axis.length;i++) {
      elevation_data_array.push([x_axis[i],elevation_values[i]]);
      power_data_array.push([x_axis[i],power_values[i]]);
      speed_data_array.push([x_axis[i],speed_values[i]]);
      cadence_data_array.push([x_axis[i],cadence_values[i]]);
    }


    function drawChart() {
      var elevation_data = google.visualization.arrayToDataTable(elevation_data_array);
      var power_data = google.visualization.arrayToDataTable(power_data_array);
      var speed_data = google.visualization.arrayToDataTable(speed_data_array);
      var cadence_data = google.visualization.arrayToDataTable(cadence_data_array);

      var elevation_options = {
        hAxis: {title: isTime ? 'Temps (s)' : 'Distance (m)'},
        vAxis: {title: 'Altitude (m)'},
        legend: 'none',
        colors: ['#4CAF50'],
        chartArea:{left:"6%",top:"5%",width:'88%',height:'80%'},
        explorer: {
            maxZoomOut:2,
            keepInBounds: true
        }
      };

      var power_options = {
        hAxis: {title: isTime ? 'Temps (s)' : 'Distance (m)'},
        vAxis: {title: 'Puissance (W)'},
        legend: 'none',
        chartArea:{left:"6%",top:"5%",width:'88%',height:'80%'},
        colors: ["#FF5722"],
        explorer: {
            maxZoomOut:2,
            keepInBounds: true
        }
      };

      var speed_options = {
        hAxis: {title: isTime ? 'Temps (s)' : 'Distance (m)'},
        vAxis: {title: 'Vitesse (km/h)'},
        legend: 'none',
        chartArea:{left:"6%",top:"5%",width:'88%',height:'80%'},
        colors: ["#2196F3"],
        explorer: {
            maxZoomOut:2,
            keepInBounds: true
        }
      };

      var cadence_options = {
        hAxis: {title: isTime ? 'Temps (s)' : 'Distance (m)'},
        vAxis: {title: 'Cadence (tpm)'},
        legend: 'none',
        chartArea:{left:"6%",top:"5%",width:'88%',height:'80%'},
        colors: ["#3F51B5"],
        explorer: {
            maxZoomOut:2,
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
    google.load('visualization', '1.0', {'packages':['corechart'], callback: drawChart});
    return 0;
}

Template.Workout.onRendered(function() {
    Session.set("x_axis", "time");
    Session.set("wk_is_fit", this.data.is_fit);
    console.log(Session.get("wk_is_fit"));
    var ec = this.find('.elevation_chart'), pc = this.find('.power_chart'), sc = this.find('.speed_chart'), cc = this.find('.cadence_chart')
    if(Session.get("wk_is_fit"))
        Meteor.call("getThisWk",this.data._id, function(e,r) {
            drawWorkoutGraphs(r, ec, pc, sc, cc);
        });
    return 0;
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
    getCRBackColor : function(c) {
        return c < 3 ? "#A5D6A7" : c < 7 ? "#FFF59D" : "#EF9A9A";
    },

    getCRFrontColor : function(c) {
        return c < 3 ? "#4CAF50" : c < 7 ? "#FFEB3B" : "#F44336";
    },
    getCRBackColorRev : function(c) {
        return c < 3 ? "#EF9A9A" : c < 7 ? "#FFF59D" : "#A5D6A7";
    },

    getCRFrontColorRev : function(c) {
        return c < 3 ? "#F44336" : c < 7 ? "#FFEB3B" : "#4CAF50";
    },
    getPercentAndColorReverse : function(c) {
        var color = c < 3 ? "red" : c < 7 ? "orange" : "green";
        var percent = c > 0 && c < 11 ? c*10 : 10;
        return percent + " " + color+"-circle";
    },
    isFit: function() {     console.log(this);return Session.get("wk_is_fit"); }
});

Template.Workout.events({
    "click #delete_bt" : function (e,t) {
        WorkoutsDB.remove(t.find(".wkid").innerHTML);
        document.location = "/workouts";
    },
    "click #x_axis_time" : function (e,t) {
        Session.set("x_axis", "time");
        console.log("TIMMMMMMMMMMMMEEEEEE");
        drawWorkoutGraphs(t.data._id, t.find('.elevation_chart'), t.find('.power_chart'));
    },
    "click #x_axis_distance" : function (e,t) {
        console.log("DISTANNNNCEEE");
        Session.set("x_axis", "distance");
        drawWorkoutGraphs(t.data._id, t.find('.elevation_chart'), t.find('.power_chart'));
    }
});
