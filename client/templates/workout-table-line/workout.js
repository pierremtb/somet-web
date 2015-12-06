Template.WorkoutTableLine.helpers({
    dispMins: function(min) {
        var h = parseInt(min/60) < 10 ? "0" + parseInt(min/60) : parseInt(min/60);
        var m = min%60 < 10 ? "0" + (min%60) : (min%60)
        return h + ":" + m;
    },
  duration: function() {
    var hours = parseInt(this.length) < 10 ? "0" + parseInt(this.length) : parseInt(this.length);
    var hours_part = this.length - hours;
    var minutes = parseInt(hours_part * 60) < 10 ? "0" + parseInt(hours_part * 60) : parseInt(hours_part * 60);
    var minutes_part = hours_part * 60 - minutes;
    var seconds = parseInt(minutes_part * 60) < 10 ? "0" + parseInt(minutes_part * 60) : parseInt(minutes_part * 60) ;
    return hours + ":" + minutes + ":" + seconds;
  },
  isTrainer: function(){ return Meteor.user().profile === "trainer";}
});

Template.WorkoutTableLine.events({
    "click #delete_bt" : function (e,t) {
        WorkoutsDB.remove(t.find(".wkid").innerHTML);
    }
});
