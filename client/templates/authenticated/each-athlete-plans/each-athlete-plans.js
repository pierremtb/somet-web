Template.AthletePlans.helpers({
  selector() {
    return {owner: Meteor.user().profile.trainer ? Session.get("selectedAthlete") : Meteor.user().username}
  }
});

Template.AthletePlans.events({
  'click tbody > tr': function (event) {
    var dataTable = $(event.target).closest('table').DataTable();
    var rowData = dataTable.row(event.currentTarget).data();
    if (!rowData) return;
    FlowRouter.go('/plan/' + rowData._id);
  }
});
