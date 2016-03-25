var date = new Date();
var graphs_are_not_here = true;
var month = date.getMonth() + 1, year = date.getFullYear();
var months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Décembre"];
var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function getDaysInMonth(month, year) {
    var month_s = month;
    month--;
    var date = new Date(year, month, 1);
    var days = [];
    while (date.getMonth() === month) {
        days.push({
            dayN: new Date(date).getDate(),
            monthN: month_s,
            yearN: year,
            date: new Date(date)
        });
        date.setDate(date.getDate() + 1);
    }
    return days;
}


Template.CalendarMonthCard.helpers({
   monthName: function(){ return months[this.month - 1];},
   days: function() { return getDaysInMonth(this.month,this.year);}
});

