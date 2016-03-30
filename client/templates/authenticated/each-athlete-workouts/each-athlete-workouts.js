Template.AthleteWorkouts.helpers({
  selector() {
    return {owner: Meteor.user().profile.trainer ? Session.get("selectedAthlete") : Meteor.user().username}
  }
});

Template.AthleteWorkouts.events({
  'click tbody > tr': function (event) {
    var dataTable = $(event.target).closest('table').DataTable();
    var rowData = dataTable.row(event.currentTarget).data();
    if (!rowData) return;
    FlowRouter.go('/workout/' + rowData._id);
  }
});
