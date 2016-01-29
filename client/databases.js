WorkoutsDB = new Mongo.Collection("workouts");
AthletesDB = new Mongo.Collection("athletes");
TrainersDB = new Mongo.Collection("trainers");
NotificationsDB = new Mongo.Collection("notifications");
PlansDB = new Mongo.Collection("plans");
HashesDB = new Mongo.Collection("hashes");
EventsDB = new Mongo.Collection("events");

TrainersDBIndex = new EasySearch.Index({
    collection: TrainersDB,
    fields: ['username','complete_name'],
    engine: new EasySearch.Minimongo()
});

AthletesDBIndex = new EasySearch.Index({
    collection: AthletesDB,
    fields: ['username','complete_name'],
    engine: new EasySearch.Minimongo()
});