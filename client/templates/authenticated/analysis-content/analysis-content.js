Template.AnalysisContent.onCreated(function () {
  let self = this;
  Tracker.autorun(function () {
    self.subscribe('thisTargetWorkoutsOfUsr',
      {month: Session.get('month_selected'), year: Session.get('year_selected')},
      Meteor.user().profile.trainer ? Session.get('selectedAthlete') : Meteor.user().username);
  });
});

function totalize(label) {
  let total = 0;
  WorkoutsDB.find().map(function (doc) {
    if (doc[label])
      total += parseInt(doc[label]);
  });
  return total;
}

function average(label) {
  let total = 0;
  WorkoutsDB.find().map(function (doc) {
    if (doc[label])
      total += parseInt(doc[label]);
  });
  return total / WorkoutsDB.find().count();
}

function max(label) {
  let max = 0;
  WorkoutsDB.find().map(function (doc) {
    try {
      max = doc.fit_values.power.ppr[label] > max ? doc.fit_values.power.ppr[label] : max;
    } catch (e) {}
  });
  return max;
}

Template.AnalysisContent.helpers({
  isWorkouts() {
    return WorkoutsDB.findOne();
  },
  totals() {
    return {
      duration: totalize('duration'),
      distance: totalize('distance'),
      ascent: totalize('ascent'),
      descent: totalize('descent'),
      calories: totalize('calories')
    }
  },
  ppr() {
    return {
      '1': max('1'),
      '2': max('2'),
      '5': max('5'),
      '10': max('10'),
      '15': max('15'),
      '20': max('20'),
      '30': max('30'),
      '60': max('60'),
      '120': max('120'),
      '180': max('180'),
      '240': max('240'),
      '300': max('300'),
      '420': max('420'),
      '600': max('600'),
      '900': max('900'),
      '1200': max('1200'),
      '1800': max('1800'),
      '2700': max('2700'),
      '3600': max('3600'),
      '5400': max('5400'),
      '7200': max('7200'),
      '9000': max('9000'),
      '10800': max('10800'),
      '12600': max('12600'),
      '14400': max('14400'),
      '16200': max('16200'),
      '18000': max('18000')
    };
  }
});
