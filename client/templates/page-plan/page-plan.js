function dispMins(min) {
    var h = parseInt(min/60) < 10 ? "0" + parseInt(min/60) : parseInt(min/60);
    var m = min%60 < 10 ? "0" + (min%60) : (min%60)
    return h + ":" + m;
}

Template.Plan.helpers({
    mondayType: function() {
        if(this.monday_type == "wk")
            return "Entrainement";
        else if(this.monday_type == "rc")
            return "Compétition";
        else if(this.monday_type == "nth")
            return "Repos";
    },
    mondaySupport: function() {
        if(this.monday_support == "mtb")
            return "VTT";
        else if(this.monday_support == "road")
            return "Route";
        else if(this.monday_support == "ht")
            return "Home Trainer";
        else if(this.monday_support == "run")
            return "Course à pied";
        else if(this.monday_support == "skix")
            return "Ski de fond";
        else if(this.monday_support == "swim")
            return "Natation";
        else if(this.monday_support == "endr")
            return "Enduro";
        else if(this.monday_support == "othr")
            return "Autre";
    },
    mondayDuration : function() {return dispMins(this.monday_duration);},
    tuesdayType: function() {
        if(this.tuesday_type == "wk")
            return "Entrainement";
        else if(this.tuesday_type == "rc")
            return "Compétition";
        else if(this.tuesday_type == "nth")
            return "Repos";
    },
    tuesdaySupport: function() {
        if(this.tuesday_support == "mtb")
            return "VTT";
        else if(this.tuesday_support == "road")
            return "Route";
        else if(this.tuesday_support == "ht")
            return "Home Trainer";
        else if(this.tuesday_support == "run")
            return "Course à pied";
        else if(this.tuesday_support == "skix")
            return "Ski de fond";
        else if(this.tuesday_support == "swim")
            return "Natation";
        else if(this.tuesday_support == "endr")
            return "Enduro";
        else if(this.tuesday_support == "othr")
            return "Autre";
    },
    tuesdayDuration : function() {return dispMins(this.tuesday_duration);},
    wednesdayType: function() {
        if(this.wednesday_type == "wk")
            return "Entrainement";
        else if(this.wednesday_type == "rc")
            return "Compétition";
        else if(this.wednesday_type == "nth")
            return "Repos";
    },
    wednesdaySupport: function() {
        if(this.wednesday_support == "mtb")
            return "VTT";
        else if(this.wednesday_support == "road")
            return "Route";
        else if(this.wednesday_support == "ht")
            return "Home Trainer";
        else if(this.wednesday_support == "run")
            return "Course à pied";
        else if(this.wednesday_support == "skix")
            return "Ski de fond";
        else if(this.wednesday_support == "swim")
            return "Natation";
        else if(this.wednesday_support == "endr")
            return "Enduro";
        else if(this.wednesday_support == "othr")
            return "Autre";
    },
    wednesdayDuration : function() {return dispMins(this.wednesday_duration);},
    thursdayType: function() {
        if(this.thursday_type == "wk")
            return "Entrainement";
        else if(this.thursday_type == "rc")
            return "Compétition";
        else if(this.thursday_type == "nth")
            return "Repos";
    },
    thursdaySupport: function() {
        if(this.thursday_support == "mtb")
            return "VTT";
        else if(this.thursday_support == "road")
            return "Route";
        else if(this.thursday_support == "ht")
            return "Home Trainer";
        else if(this.thursday_support == "run")
            return "Course à pied";
        else if(this.thursday_support == "skix")
            return "Ski de fond";
        else if(this.thursday_support == "swim")
            return "Natation";
        else if(this.thursday_support == "endr")
            return "Enduro";
        else if(this.thursday_support == "othr")
            return "Autre";
    },
    thursdayDuration : function() {return dispMins(this.thursday_duration);},
    fridayType: function() {
        if(this.friday_type == "wk")
            return "Entrainement";
        else if(this.friday_type == "rc")
            return "Compétition";
        else if(this.friday_type == "nth")
            return "Repos";
    },
    fridaySupport: function() {
        if(this.friday_support == "mtb")
            return "VTT";
        else if(this.friday_support == "road")
            return "Route";
        else if(this.friday_support == "ht")
            return "Home Trainer";
        else if(this.friday_support == "run")
            return "Course à pied";
        else if(this.friday_support == "skix")
            return "Ski de fond";
        else if(this.friday_support == "swim")
            return "Natation";
        else if(this.friday_support == "endr")
            return "Enduro";
        else if(this.friday_support == "othr")
            return "Autre";
    },
    fridayDuration : function() {return dispMins(this.friday_duration);},
    saturdayType: function() {
        if(this.saturday_type == "wk")
            return "Entrainement";
        else if(this.saturday_type == "rc")
            return "Compétition";
        else if(this.saturday_type == "nth")
            return "Repos";
    },
    saturdaySupport: function() {
        if(this.saturday_support == "mtb")
            return "VTT";
        else if(this.saturday_support == "road")
            return "Route";
        else if(this.saturday_support == "ht")
            return "Home Trainer";
        else if(this.saturday_support == "run")
            return "Course à pied";
        else if(this.saturday_support == "skix")
            return "Ski de fond";
        else if(this.saturday_support == "swim")
            return "Natation";
        else if(this.saturday_support == "endr")
            return "Enduro";
        else if(this.saturday_support == "othr")
            return "Autre";
    },
    saturdayDuration : function() {return dispMins(this.saturday_duration);},
    sundayType: function() {
        if(this.sunday_type == "wk")
            return "Entrainement";
        else if(this.sunday_type == "rc")
            return "Compétition";
        else if(this.sunday_type == "nth")
            return "Repos";
    },
    sundaySupport: function() {
        if(this.sunday_support == "mtb")
            return "VTT";
        else if(this.sunday_support == "road")
            return "Route";
        else if(this.sunday_support == "ht")
            return "Home Trainer";
        else if(this.sunday_support == "run")
            return "Course à pied";
        else if(this.sunday_support == "skix")
            return "Ski de fond";
        else if(this.sunday_support == "swim")
            return "Natation";
        else if(this.sunday_support == "endr")
            return "Enduro";
        else if(this.sunday_support == "othr")
            return "Autre";
    },
    sundayDuration : function() {return dispMins(this.sunday_duration);}
})
