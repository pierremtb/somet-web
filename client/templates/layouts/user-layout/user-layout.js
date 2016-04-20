function isThisPage(p) {
    return p == Session.get("currentPage");
}

Template.UserLayout.helpers({
   pageName: () => {
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
    isItDash: () =>{ return isThisPage("Dashboard"); },
    isItWks: () =>{ return isThisPage("Entrainements"); },
    isItPls: () =>{ return isThisPage("Plans"); },
    isItCal: () =>{ return isThisPage("Calendrier"); },
    isItAnl: () =>{ return isThisPage("Analyse"); },
    isItSet: () =>{ return isThisPage("Paramètres"); },
    isItEvt: () =>{ return isThisPage("Evénements"); }
});

Template.UserLayout.onRendered(() =>{
});
