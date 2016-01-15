function isThisPage(p) {
    return p == Session.get("currentPage");
}

Template.UserLayout.helpers({
   pageName: function() {
       switch(Router.current().url) {
           case "/dashboard":
               Session.set("currentPage","Dashboard");
               break;
           case "/workouts":
               Session.set("currentPage","Entrainements");
               break;
           case "/plans":
               Session.set("currentPage","Plans");
               break;
           case "/calendar":
               Session.set("currentPage","Calendrier");
               break
           case "/analysis":
               Session.set("currentPage","Analyse");
               break;
           case "/settings":
               Session.set("currentPage","Paramètres");
               break;
           case "/events":
               Session.set("currentPage","Evénements");
               break;
           default:Session.set("currentPage","");
       }
       return Session.get("currentPage");
   },
    isItDash: function(){ return isThisPage("Dashboard"); },
    isItWks: function(){ return isThisPage("Entrainements"); },
    isItPls: function(){ return isThisPage("Plans"); },
    isItCal: function(){ return isThisPage("Calendrier"); },
    isItAnl: function(){ return isThisPage("Analyse"); },
    isItSet: function(){ return isThisPage("Paramètres"); },
    isItEvt: function(){ return isThisPage("Evénements"); }
});

Template.UserLayout.onRendered(function(){
});