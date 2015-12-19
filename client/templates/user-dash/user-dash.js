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
    var works = Meteor.call("getMonthWk", me, month, year);
    var i, temp, workouts = [], days = [], fin = [];
    for(key in works) {
      workouts[key]=works[key].length;
      days[key]=works[key].day;
    }
    daysinmonth = getDaysInMonth(month, year);
    for(i in daysinmonth) {
        temp = days.indexOf(daysinmonth[i]);
        if(temp == -1)
            fin[i] = 0;
        else
            fin[i] = workouts[temp];
    }

    t.find("#monthly_graph_title").innerHTML = months[month - 1] + " " + year;
    var mtbs = Meteor.call("countThisSupportHoursInMonth",me,month,year,"mtb");
    var roads = Meteor.call("countThisSupportHoursInMonth",me,month,year,"road");
    var runs = Meteor.call("countThisSupportHoursInMonth",me,month,year,"run");
    var hts = Meteor.call("countThisSupportHoursInMonth",me,month,year,"ht");
    var swims = Meteor.call("countThisSupportHoursInMonth",me,month,year,"swim");
    var endrs = Meteor.call("countThisSupportHoursInMonth",me,month,year,"endr");
    var skixs = Meteor.call("countThisSupportHoursInMonth",me,month,year,"skix");
    var othrs = Meteor.call("countThisSupportHoursInMonth",me,month,year,"othr");
    var datac = [
    {
        value: mtbs,
        color:"#ec407a",
        highlight: "#f06292",
        label: "VTT"
    },
    {
        value: roads + hts,
        color: "#03a9f4",
        highlight: "#29b6f6",
        label: "Route"
    },
    {
        value: swims + endrs + skixs + othrs + runs,
        color: "#455a64",
        highlight: "#29b6f6",
        label: "Autre"
    }
]
    var datat = {
        labels: daysinmonth,
        datasets: [
            {
                data: fin,
                strokeColor: "#ec407a",
                fillColor: "#ec407a"
            }
        ]
    };
    options = {
      responsive: true,
      scaleFontColor: "#000",
      legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"


    };
    var ctx = t.find("#chart").getContext("2d");
    var piectx = t.find("#pie-chart").getContext("2d");
    monthChart = new Chart(ctx).Bar(datat, options);
    sportsChart = new Chart(piectx).Doughnut(datac, options);
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
    workouts: function () {
          return Meteor.call("getLastWk",this.username + "");
    },

    isWk: function () {
          if(Meteor.call("getLastWk", this.username + ""))
              return true;
          else
            return false;
    },
    todayPlan: function () {
          if(Meteor.call("getThisWeekPlan",this.username + "",getPreviousMonday()))
              return true;
          else
            return false;
    },
    todayType: function () {
        var td = Meteor.call("getThisWeekPlan",this.username + "",getPreviousMonday())[days[date.getDay()].toLowerCase() + "_type"];
        return  td == "nth" ? "Repos" : td == "wk" ? "Entrainement" : td == "rc" ? "Compétition" : "";
    },
    todaySupport: function () {
        var td = Meteor.call("getThisWeekPlan",this.username + "",getPreviousMonday())[days[date.getDay()].toLowerCase() + "_support"];
        return  td == "mtb" ? "VTT" : td == "road" ? "Route" : td == "ht" ? "Home Trainer" : td == "run" ? "Course à pied" : td == "skix" ? "Ski de fond" : td == "swim" ? "Natation" : td == "othr" ? "Autre" :  "";
    },
    user: function() {
          return this.username + "";
    }
});

Template.UserDash.events({
    "click #previous" : function(e,t) {
        dispPreviousMonth(t.data.username,t);
    },
    "click #next" : function(e,t) {
        dispNextMonth(t.data.username,t);
    },
    "mouseenter" : function(e,t) {
        if(t.find("#monthly_graph_title").innerHTML == "Juillet") {

        }
    }
});


Template.UserDash.onRendered(function() {
    var t = this;
    this.autorun(function() {drawMonthGraph(Session.get("selectedAthlete"),t);});
});
