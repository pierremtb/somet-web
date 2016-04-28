Template.Analysis.events({
  'change select': (e, t) =>{
    Session.set(e.target.getAttribute('id'), parseInt(e.target.value));
  }
});

Template.Analysis.helpers({
  target() {
    return {month: parseInt(Session.get('month_selected')), year: parseInt(Session.get('year_selected'))};
  }
});

Template.Analysis.onCreated(function () {
  let date = new Date();
  if (!Session.get('month_selected'))
    Session.set('month_selected', date.getMonth());
  if (!Session.get('year_selected'))
    Session.set('year_selected', date.getFullYear());
});
