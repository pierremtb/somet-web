var days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

Template.PlanDayInput.onRendered(function (){
  let self = this;
  Tracker.autorun(function() {
    if (isEdit.get()) {
      let type = Session.get('day_' + self.data + '_type');
      self.find('#type').value = type;
      $('select').material_select();
      if(type == 'wk') {
        let sup = self.find('#support');
        sup.value = Session.get('day_' + self.data + '_support');
        sup.disabled = false;
        $(sup).material_select();

        let dur = self.find('#duration');
        dur.value = Session.get('day_' + self.data + '_duration');
        dur.disabled = false;
        $(dur).material_select();
        
        let des = self.find('#description');
        des.innerHTML = Session.get('day_' + self.data + '_description');
        des.disabled = false;
      }
    } else {
      $(self.find('#duration')).material_select();
      $(self.find('#description')).material_select();
      $(self.find('#type')).material_select();
    }
    if(Template.instance().data == 6) {
      console.log('nausiteau');
      $('select').material_select();
    }
  });
});

Template.PlanDayInput.helpers({
  thisDayEvent() {
    let offset = parseInt(this);
    let ev =  EventsDB.findOne({
      owner: Session.get('selectedAthlete'),
      date: moment(Session.get('pl_monday_date')).add(offset,'days').toDate()
    });
    if(ev) {
      Session.set('day_' + this + '_type', 'rc');
      Session.set('day_' + this + '_event_id', ev._id);
    }
  },
  isDurationSelected(dur) {
    $('select').material_select();
    return Session.get('day_' + this + '_duration') == dur ? 'true' : 'false';
  },
  isTypeSelected(type) {
    $('select').material_select();
    return Session.get('day_' + this + '_type') == type ? 'true' : 'false';
  },
  isSupportSelected(support) {
    $('select').material_select();
    return Session.get('day_' + this + '_support') == support ? 'true' : 'false';
  },
  sessionDescription() {
    return Session.get('day_' + this + '_title');
  },
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
