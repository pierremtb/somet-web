Router.map(function() {

    this.route('new_workout', {
        path: '/api/new_workout',
        where: 'server',
        action: function() {

            // Watch the Meteor log to see this output
            console.log("Hook called.");
            var datas = this.request.body;
            if(datas.passhash == HashesDB.findOne({username : datas.user}).passhash) {
                WorkoutsDB.insert({
                    title: datas.title,
                    description: datas.description,
                    length: datas.length,
                    distance: datas.distance,
                    crten: datas.crten,
                    user: datas.user,
                    day: new Date().getDate(),
                    month: new Date().getMonth() + 1,
                    year: new Date().getFullYear(),
                    hrvalues: datas.hrvalues,
                    distancevalues: datas.distancevalues,
                    elevvalues: datas.elevvalues
                });
                this.response.writeHead(200, {'Content-Type': 'text/html'});
                this.response.write("0");
            }
            else {
                console.log("Pass incorrect");
                this.response.writeHead(200, {'Content-Type': 'text/html'});
                this.response.write("1");
            }


            // `this.response.end` *must* be called, or else the connection is left open.
            this.response.end("");
        }
    });

});