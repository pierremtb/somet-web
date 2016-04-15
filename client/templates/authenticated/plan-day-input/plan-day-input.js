Template.PlanDayInput.helpers({
  isRace() {
    return Session.get('day_' + this + '_type') == 'rc';
  },
  isWorkout() {
    return Session.get('day_' + this + '_type') == 'wk';
  },
  ifRestSetDisabled() {
    return Session.get('day_' + this + '_type')? 'disabled' : '';
  },
  ifRaceSetDisabled() {
    return Session.get('day_' + this + '_type') ? 'disabled' : '';
  }
});

Template.PlanDayInput.events({
  'change #type': function (e,t) {
    Session.set('day_' + this + '_type', e.target.value);
    if(e.target.value == 'nth') {
      t.find("#duration").value = 0;
      t.find("#duration").disabled = true;
      t.find("#support").disabled = true;
      t.find("#description").disabled = true;
    } else if(e.target.value == 'rc') {
      t.find("#duration").value = 0;
      t.find("#duration").disabled = true;
      t.find("#support").disabled = false;
      t.find("#description").disabled = false;
    } else {
      t.find("#duration").disabled = false;
      t.find("#support").disabled = false;
      t.find("#description").disabled = false;
    }
    $('select').material_select();
  },
  'change #duration': function (e,t) {
    Session.set('day_' + this + '_duration', parseInt(e.target.value));
  },
  'change #description': function (e,t) {
    Session.set('day_' + this + '_description', e.target.value);
  },
  'change #support': function (e,t) {
    Session.set('day_' + this + '_support', e.target.value);
  }
});
