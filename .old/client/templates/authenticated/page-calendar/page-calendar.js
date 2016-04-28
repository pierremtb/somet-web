var months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Décembre"];

Template.Calendar.helpers({
    monthOne: () => Session.get("monthOne"),
    monthTwo: () => Session.get("monthTwo"),
    monthThree: () => Session.get("monthThree"),
    yearOne: () => Session.get("yearOne"),
    yearTwo: () => Session.get("yearTwo"),
    yearThree: () => Session.get("yearThree"),
    previousMonth: () =>  Session.get("monthOne") == 1 ? months[11] : months[Session.get("monthOne") - 2],
    previousYear: () => Session.get("monthOne") == 1 ? Session.get("yearThree") - 1 : Session.get("yearOne"),
    nextMonth: () =>  Session.get("monthThree") == 12 ? months[0] : months[Session.get("monthThree")],
    nextYear: () => Session.get("monthThree") == 12 ? Session.get("yearThree") + 1 : Session.get("yearThree")
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
    "click #next_month": (e,t) => {
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
    "click #previous_month": (e,t) => {
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
