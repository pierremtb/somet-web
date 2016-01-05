var monthChart, sportsChart;

function getDaysInMonth(month, year) {
     month--;
     var date = new Date(year, month, 1);
     var days = [];
     while (date.getMonth() === month) {
        days.push(new Date(date).getDate());
        date.setDate(date.getDate() + 1);
     }
     return days;
}

function dispMins(min) {
    var h = parseInt(min/60) < 10 ? "0" + parseInt(min/60) : parseInt(min/60);
    var m = min%60 < 10 ? "0" + (min%60) : (min%60);
    return h + ":" + m;
}

var date = new Date();
var graphs_are_not_here = true;
var month = date.getMonth() + 1, year = date.getFullYear();
var months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Décembre"];
var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

function getPreviousMonday() {
      var prev_m = new Date();
      prev_m.setDate(prev_m.getDate() - date.getDay() + 1);
      return prev_m.getDate() + " " + monthNames[prev_m.getMonth()] + ", " + prev_m.getFullYear();
}

function drawMonthGraph(me,t) {
    Meteor.call("getMonthWk", me, month, year, function(e,works) {
        var i, temp, workouts = [], days = [], fin = [];
        for(key in works) {
          workouts[key]=works[key].length/60;
          days[key]=works[key].day;
        }
        var daysinmonth = getDaysInMonth(month, year);
        var wks_month_data = [];
        wks_month_data.push(['Jour','Durée']);
        for(i in daysinmonth) {
            temp = days.indexOf(daysinmonth[i]);
            if(temp == -1)
                wks_month_data.push([daysinmonth[i],0]);
            else
                wks_month_data.push([daysinmonth[i],workouts[temp]]);;
        }

        t.find("#monthly_graph_title").innerHTML = months[month - 1] + " " + year;

        Meteor.call("countSupportsHoursInMonth",me,month,year, function(e,r) {

            function drawChartWkMonth() {
                var data_wks_month = google.visualization.arrayToDataTable(wks_month_data);

                var options_wks_month = {
                    colors: ["#ec407a"],
                    legend: {position: 'none'}
                };

                var chart_wk_month = new google.charts.Bar(document.getElementById('columnchart_material'));

                chart_wk_month.draw(data_wks_month, options_wks_month);
            }

            function drawChartRepart() {
                var data_repart = google.visualization.arrayToDataTable([
                    ['Sport', 'Nombre par mois'],
                    ['VTT', r.mtbs],
                    ['Route', r.roads],
                    ['Course à pied', r.runs],
                    ['Home Trainer', r.hts],
                    ['Natation', r.swims],
                    ['Enduro', r.endrs],
                    ['Ski de fond', r.skixs],
                    ['Autre', r.othrs]
                ]);

                var options_repart = {
                    pieHole: 0.2,
                    colors: ["#ec407a","#26a69a","#29b6f6","#5c6bc0","#ef5350","#66bb6a","#ffee58","#78909c"],
                    legend: {
                        position: 'bottom'
                    },
                    chartArea:{top: 0, width: "90%", left: "5%"}
                };

                var chart_repart = new google.visualization.PieChart(document.getElementById('donutchart'));

                chart_repart.draw(data_repart, options_repart);
            }
            google.load("visualization", "1.1", {packages:["bar"], callback: drawChartWkMonth});
            google.load("visualization", "1", {packages:["corechart"], callback: drawChartRepart});
        });
    });
    return 0;
}

function dispPreviousMonth(me,t) {
    if(month > 1)
        month--;
    else {
        month = 12;
        year--;
    }
    drawMonthGraph(me,t);
}

function dispNextMonth(me,t) {
    if(month < 12)
        month++;
    else {
        month = 1;
        year++;
    }
    drawMonthGraph(me,t);
}

Template.UserDash.helpers({
    isWk: function () { wk.set(ReactiveMethod.call("getLastWk",this.username)); return wk.get() != null; },
    workouts: function () { return wk.get(); },
    todayPlan: function () { pls.set(ReactiveMethod.call("getThisWeekPlan", this.username, getPreviousMonday())); return pls.get() != undefined;},
    todayType: function () {
        try {
            var td = pls.get()[days[date.getDay()].toLowerCase() + "_type"];
            return  td == "nth" ? "Repos" : td == "wk" ? "Entrainement" : td == "rc" ? "Compétition" : "";
        }
        catch(e) {
            return "Error";
        }
    },
    todaySupport: function () {
        try {
            var td = pls.get()[days[date.getDay()].toLowerCase() + "_support"];
            return  td == "mtb" ? "VTT" : td == "road" ? "Route" : td == "ht" ? "Home Trainer" : td == "run" ? "Course à pied" : td == "skix" ? "Ski de fond" : td == "swim" ? "Natation" : td == "othr" ? "Autre" :  "";
        }
        catch(e) {
            return "Error";
        }
    },
    todayDuration: function () {
        try {
            var d = pls.get()[days[date.getDay()].toLowerCase() + "_duration"];
            return d == "" ? "" : dispMins(parseInt(pls.get()[days[date.getDay()].toLowerCase() + "_duration"]));
        }
        catch(e) {
            return "Error";
        }
    },
    planId: function () { return pls.get()._id},
    user: function() { return this.username + "";}
});

Template.UserDash.events({
    "click #previous" : function(e,t) {
        dispPreviousMonth(t.data.username,t);
    },
    "click #next" : function(e,t) {
        dispNextMonth(t.data.username,t);
    }
});

Template.UserDash.onRendered(function() {
    var t = this;
    this.autorun(function() {drawMonthGraph(Meteor.user().profile == "trainer" ? Session.get("selectedAthlete") : Meteor.user().username,t);});
});

Template.UserDash.onCreated(function() {
    pls = new ReactiveVar();
    wk = new ReactiveVar();
});
