Meteor.methods({
  insertWorkout( argument ) {
    check( argument, Object );

    try {
      var documentId = WorkoutsDB.insert( argument );
      return documentId;
    } catch( exception ) {
      return exception;
    }
  },
  fetchLastStravaActivities() {
    let token = Meteor.user().services.strava.accessToken,
        username = Meteor.user().username;
    let Strava = new StravaClient(token);
    let r = Strava.getActivities();
    for(let i in r) {
      var date = new Date(r[i].start_date_local);
      WorkoutsDB.upsert({
        strava_id: r[i].id
      }, { $set: {
        owner: username,
        title: r[i].name,
        start_date: date,
        duration: r[i].elapsed_time,
        distance: r[i].distance,
        support: r[i].type == "Ride" ? "0" : "8",
        fit_linked: false,
        "speed.avg": r[i].average_speed,
        "speed.max": r[i].max_speed,
        ascent: r[i].total_elevation_gain,
        calories: r[i].calories,
        strava_id: r[i].id
      }});
    }
    return 0;
  }
});
