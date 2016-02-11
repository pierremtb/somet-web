var date = new Date();
var graphs_are_not_here = true;
var month = date.getMonth() + 1, year = date.getFullYear();
var months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Décembre"];
var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var days = ["D", "L", "M", "M", "J", "V", "S"];

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

function getSupport(support) {
    switch (support) {
        case "mtb":
            return "VTT";
            break;
        case "road":
            return "Route";
            break;
        case "run":
            return "Course à pied";
            break;
        case "ht":
            return "Home Trainer";
            break;
        case "swim":
            return "Natation";
            break;
        case "skix":
            return "Ski de fond";
            break;
        case "endr":
            return "Enduro";
            break;
        case "othr":
            return "Autre";
            break;
        default:
            return "";
            break;
    }
}

Template.CalendarMonthLine.helpers({
    evts: function() { return EventsDB.find({day: this.day, month: this.month, year: this.year});},
    dayInitial: function() {
        var d = new Date(this.month + "-" + this.day + "-" + this.year);
        return days[d.getDay()];
    },
    isEv: function() { return EventsDB.find({day: this.day, month: this.month, year: this.year}).fetch().length != 0; },
    isFCEv: function() { return EventsDB.find({day: this.day, month: this.month, year: this.year, first_class_event: true}).fetch().length != 0; },
    isSCEv: function() { return EventsDB.find({day: this.day, month: this.month, year: this.year, second_class_event: true}).fetch().length != 0; },
    isPEv: function() { return EventsDB.find({day: this.day, month: this.month, year: this.year, preparation_event: true}).fetch().length != 0; },
    getSupport: function(support) {
        switch (support) {
            case "mtb":
                return "VTT";
                break;
            case "road":
                return "Route";
                break;
            case "run":
                return "Course à pied";
                break;
            case "ht":
                return "Home Trainer";
                break;
            case "swim":
                return "Natation";
                break;
            case "skix":
                return "Ski de fond";
                break;
            case "endr":
                return "Enduro";
                break;
            case "othr":
                return "Autre";
                break;
            default:
                return "";
                break;
        }
    }
});

/*Template.CalendarMonthLine.events({
   "mouseover"
});*/