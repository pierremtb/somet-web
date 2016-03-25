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
