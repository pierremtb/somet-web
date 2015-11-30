var monthChart, sportsChart;

function getDaysInMonth(month, year) {
     month--;
     var date = new Date(year, month, 1);
     var days = [];
     console.log('month', month, 'date.getMonth()', date.getMonth())
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

function drawMonthGraph(me,t) {
    var works =  WorkoutsDB.find({user: me, month: month, year: year}).fetch();
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
    var mtbs = WorkoutsDB.find({user: me, month: month, year: year, mtb: true}).fetch().length;
    var roads = WorkoutsDB.find({user: me, month: month, year: year, road: true}).fetch().length;
    var others = WorkoutsDB.find({user: me, month: month, year: year, other: true}).fetch().length;
    console.log(mtbs);
    var datac = [
    {
        value: mtbs,
        color:"#ec407a",
        highlight: "#f06292",
        label: "VTT"
    },
    {
        value: roads,
        color: "#03a9f4",
        highlight: "#29b6f6",
        label: "Route"
    },
    {
        value: others,
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
          return WorkoutsDB.find({user: this.username + ""}, {sort: {date: -1}, limit:1});
    },
    plans: function () {
          return PlansDB.find({username: this.username + ""},{sort: {date: -1}, limit:1});
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
            drawMonthGraph(t.data.username,t);
        }
    }
});


Template.UserDash.onRendered(function() {
    //this.$("#next").click();
    //this.$("#next").click();
});
