Meteor.methods({
  getPlans( argument ) {
    check( argument, String );

    var document = PlansDB.find( argument );

    if ( !document ) {
      throw new Meteor.Error( 'document-not-found', 'No documents found matching this query.' );
    }

    return document;
  }
});
