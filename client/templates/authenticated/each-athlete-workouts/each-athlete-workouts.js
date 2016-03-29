Template.AthleteWorkouts.helpers({
  workouts: function () {
    return []//WorkoutsDB.find();
  },
  isWks: function () {
    return WorkoutsDB.find().count() > 0;
  }
});

Template.AthleteWorkouts.onCreated(function () {
  this.subscribe('workoutsOfUsr', this.data.username);
});

Template.AthleteWorkouts.events({
  'click tbody > tr': function (event) {
    var dataTable = $(event.target).closest('table').DataTable();
    var rowData = dataTable.row(event.currentTarget).data();
    if (!rowData) return;
    window.location = 'workout/' + rowData._id;
  }
});
