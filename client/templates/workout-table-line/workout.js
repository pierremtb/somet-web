Template.WorkoutTableLine.helpers({
  duration: function() {
    var hours = parseInt(this.length) < 10 ? "0" + parseInt(this.length) : parseInt(this.length);
    var hours_part = this.length - hours;
    var minutes = parseInt(hours_part * 60) < 10 ? "0" + parseInt(hours_part * 60) : parseInt(hours_part * 60);
    var minutes_part = hours_part * 60 - minutes;
    var seconds = parseInt(minutes_part * 60) < 10 ? "0" + parseInt(minutes_part * 60) : parseInt(minutes_part * 60) ;
    return hours + ":" + minutes + ":" + seconds;
  }
});

Template.WorkoutTableLine.events({
    "click #delete_bt" : function (e,t) {
        WorkoutsDB.remove(t.find(".wkid").innerHTML);
    }
});
