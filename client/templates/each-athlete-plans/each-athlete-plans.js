Template.AthletePlans.helpers({
    plans: function () {
        return ReactiveMethod.call("getAllPl",this.username);
    },
    isNoPls: function () {
        return ReactiveMethod.call("getAllPl",this.username).length == 0;
    }
});
