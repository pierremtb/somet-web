Template.Search.onCreated(function () {});

Template.Search.onRendered(function () {});


Template.Search.helpers({
  searchIndexes() {
    return [AthletesIndex, TrainersIndex];
  },
  athletesIndex: () => AthletesIndex,
  trainersIndex: () => TrainersIndex,
  attributes: () => {
    return {
      type: 'text',
      placeholder: 'Rechercher un athtlète, un entraineur, ...',
      style: 'font-size:50px; padding-bottom:15px',
      class: 'light'
    };
  },
  usersIndex: () => UsersIndex,
  usersWhoMatch() {
    return UsersIndex.search(Session.get("searchQuery")).fetch();
  }
});

Template.Search.events({
  "keyup #search_bar": (e, t) => {
    Session.set('searchQuery', e.target.value);
  }
});
