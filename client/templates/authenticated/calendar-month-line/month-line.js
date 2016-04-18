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
  evts() {
    let this_date = new Date(this.date);
    return EventsDB.find({date: this_date});
  },
  dayInitial() {
    var d = new Date(this.month + "-" + this.day + "-" + this.year);
    return days[d.getDay()];
  },
  isEv() {
    let this_date = new Date(this.date);
    return EventsDB.find({date: this_date}).count() > 0;
  },
  isFCEv() {
    let this_date = new Date(this.date);
    return EventsDB.find({date: this_date, class: 'first'}).count() > 0;
  },
  isSCEv() {
    let this_date = new Date(this.date);
    return EventsDB.find({date: this_date, class: 'second'}).count() > 0;
  },
  isPEv() {
    let this_date = new Date(this.date);
    return EventsDB.find({date: this_date, class: 'preparation'}).count() > 0;
  },
  isPast() {
    let now = new Date(),
        this_date = new Date(this.date),
        date = new Date(EventsDB.findOne({date: this_date}).date);
    return date.getTime() < now.getTime();
  },
  getSupport: function (support) {
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

Template.CalendarMonthLine.onCreated(function () {
  let self = this;
  Tracker.autorun(function() {
    self.subscribe('dayEventsOfUsr', Meteor.user().profile.trainer ? Session.get('selectedAthlete') : Meteor.user().username, self.data.date);
  });
});
