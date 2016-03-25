const fetchStrava = () => {
  Meteor.setInterval(function () {
    let users = _getUsers();
    console.log("us");
    for (let i in users) {
      if (users[i].services.strava && users[i].profile.strava_sync) {
        _fetchLastActivities(users[i].services.strava.accessToken, users[i].username)
      }
      else
        console.log("nostravauser");
    }
  }, 60000);
};

let _getUsers = () => {
  return Meteor.users.find().fetch()
};

let _fetchLastActivities = (token, username) => {
  let Strava = new StravaClient(token);
  console.log("fetching");
  let activities = Strava.getActivities();
  for (let i in activities) {
    var date = new Date(activities[i].start_date_local);
    _upsertStravaActivity(activities[i].id, {
      owner: username,
      title: activities[i].name,
      start_date: date,
      duration: activities[i].elapsed_time,
      distance: activities[i].distance,
      support: activities[i].type == "Ride" ? "mtb" : "run",
      fit_linked: false,
      "speed.avg": activities[i].average_speed,
      "speed.max": activities[i].max_speed,
      ascent: activities[i].total_elevation_gain,
      calories: activities[i].calories,
      strava_id: activities[i].id
    });
  }
};

let _upsertStravaActivity = (id, wk) => {
  WorkoutsDB.upsert({ strava_id: id }, {$set: wk}, function(err, num, upserted) {
    console.log(upserted,err,num);
  });
};

Modules.server.fetchStrava = fetchStrava;
