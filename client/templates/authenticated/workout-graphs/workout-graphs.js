Template.WorkoutGraphs.events({
  "click #x_axis_time": (e, t) =>{
    Session.set("x_axis", "time");
    Modules.client.drawWorkoutsGraphs(t.data.workout,
      t.find('#elevation_chart'),
      t.find('#power_chart'),
      t.find('#speed_chart'),
      t.find('#cadence_chart'),
      t.find('#heart_rate_chart'));
  },
  "click #x_axis_distance": (e, t) =>{
    Session.set("x_axis", "distance");
    Modules.client.drawWorkoutsGraphs(t.data.workout,
      t.find('#elevation_chart'),
      t.find('#power_chart'),
      t.find('#speed_chart'),
      t.find('#cadence_chart'),
      t.find('#heart_rate_chart'));
  }
});

Template.WorkoutGraphs.helpers({});

Template.WorkoutGraphs.onCreated(function () {
  Session.set("x_axis", "time");
});

Template.WorkoutGraphs.onRendered(function () {
  Modules.client.drawWorkoutsGraphs(this.data.workout,
                                    this.find('#elevation_chart'),
                                    this.find('#power_chart'),
                                    this.find('#speed_chart'),
                                    this.find('#cadence_chart'),
                                    this.find('#heart_rate_chart'),
                                    this.find('#ppr_chart'));
});
