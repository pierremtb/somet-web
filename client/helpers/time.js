const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Décembre"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

Template.registerHelper("dispDuration", function (seconds) {
  return (new Date(seconds * 1000)).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0];
});

Template.registerHelper("dispDistance", function (meters) {
  return (meters / 1000).toFixed(2);
});

Template.registerHelper("dispType", function (t) {
  switch(t) {
    case 'wk': return "Entrainement";
    case 'rc': return "Compétition";
    case 'nth': return "Repos";
  }
});

Template.registerHelper("dispSupport", function (s) {
  switch (s) {
    case "mtb": return "VTT";
    case "road": return "Route";
    case "run": return "Course à pied";
    case "ht": return "Home Trainer";
    case "swim": return "Natation";
    case "skix": return "Ski de fond";
    case "endr": return "Enduro";
    case "othr": return "Autre";
  }
});

Template.registerHelper("dispDayName", function (i) {
  switch(i) {
    case 0: return "Lundi";
    case 1: return "Mardi";
    case 2: return "Mercredi";
    case 3: return "Jeudi";
    case 4: return "Vendredi";
    case 5: return "Samedi";
    case 6: return "Dimanche";
  }
});

Template.registerHelper("dispNotificationText", function(type, value) {
  switch(type) {
    case "trainer_confirmation":
      return "@" + value + " est désormais votre entraineur !";
    case "athlete_confirmation":
      return "Vous entrainez désormais l'athlete @" + value;
    case "invite_for_trainer":
      return "L'athlete @" + value + " veut que vous deveniez son entraineur";
    case "invite_for_athlete":
      return "@" + value + " veut devenir votre entraineur";
  }
});

Template.registerHelper('dispName', (cn, usr) => {
  return cn == undefined ? '@' + usr : cn
});

Template.registerHelper('dispMonthName', (month) => {
  return months[month];
});
