var months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Décembre"];

Template.Calendar.helpers({
    monthOne: function() { return Session.get("monthOne");},
    monthTwo: function() { return Session.get("monthTwo");},
    monthThree: function() { return Session.get("monthThree");},
    yearOne: function() { return Session.get("yearOne");},
    yearTwo: function() { return Session.get("yearTwo");},
    yearThree: function() { return Session.get("yearThree");},
    previousMonth: function() { return  Session.get("monthOne") == 1 ? months[11] : months[Session.get("monthOne") - 2];},
    previousYear: function() { return Session.get("monthOne") == 1 ? Session.get("yearThree") - 1 : Session.get("yearOne");},
    nextMonth: function() { return  Session.get("monthThree") == 12 ? months[0] : months[Session.get("monthThree")];},
    nextYear: function() { return Session.get("monthThree") == 12 ? Session.get("yearThree") + 1 : Session.get("yearThree");}
});

Template.Calendar.onRendered(function () {
    var d = new Date();
    Session.set("monthOne", d.getMonth() + 1);
    Session.set("monthTwo", d.getMonth() + 2);
    Session.set("monthThree", d.getMonth() + 3);
    Session.set("yearOne", d.getFullYear());
    Session.set("yearTwo", d.getFullYear());
    Session.set("yearThree", d.getFullYear());
});

Template.Calendar.events({
    "click #next_month": function(e,t) {
        if(Session.get("monthOne") < 12 && Session.get("monthTwo") < 12 && Session.get("monthThree") < 12) {
            Session.set("monthOne", Session.get("monthOne") + 1);
            Session.set("monthTwo", Session.get("monthTwo") + 1);
            Session.set("monthThree", Session.get("monthThree") + 1);
        }
        else if(Session.get("monthThree") == 12) {
            Session.set("monthOne", Session.get("monthOne") + 1);
            Session.set("monthTwo", Session.get("monthTwo") + 1);
            Session.set("monthThree", 1);
            Session.set("yearThree", Session.get("yearThree") + 1);
        }
        else if(Session.get("monthTwo") == 12) {
            Session.set("monthOne", Session.get("monthOne") + 1);
            Session.set("monthTwo", 1);
            Session.set("monthThree", Session.get("monthThree") + 1);
            Session.set("yearTwo", Session.get("yearTwo") + 1);
        }
        else if(Session.get("monthOne") == 12) {
            Session.set("monthOne", 1);
            Session.set("monthTwo", Session.get("monthTwo") + 1);
            Session.set("monthThree", Session.get("monthThree") + 1);
            Session.set("yearOne", Session.get("yearOne") + 1);
        }
    },
    "click #previous_month": function(e,t) {
        if(Session.get("monthOne") > 1 && Session.get("monthTwo") > 1 && Session.get("monthThree") > 1) {
            Session.set("monthOne", Session.get("monthOne") - 1);
            Session.set("monthTwo", Session.get("monthTwo") - 1);
            Session.set("monthThree", Session.get("monthThree") - 1);
        }
        else if(Session.get("monthThree") == 1) {
            Session.set("monthOne", Session.get("monthOne") - 1);
            Session.set("monthTwo", Session.get("monthTwo") - 1);
            Session.set("monthThree", 12);
            Session.set("yearThree", Session.get("yearThree") - 1);
        }
        else if(Session.get("monthTwo") == 1) {
            Session.set("monthOne", Session.get("monthOne") - 1);
            Session.set("monthTwo", 12);
            Session.set("monthThree", Session.get("monthThree") - 1);
            Session.set("yearTwo", Session.get("yearTwo") - 1);
        }
        else if(Session.get("monthOne") == 1) {
            Session.set("monthOne", 12);
            Session.set("monthTwo", Session.get("monthTwo") - 1);
            Session.set("monthThree", Session.get("monthThree") - 1);
            Session.set("yearOne", Session.get("yearOne") - 1);
        }
     }
});