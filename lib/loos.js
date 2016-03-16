Loos = new Mongo.Collection('loos');

Loos.allow({
  insert: function(userId) {
    return true;
  },
  remove: function(userId, doc) {
    return true;
  }
});


if (Meteor.isServer && Loos.find().count() === 0) {
  Meteor.startup(function() {
    var looSeeds = [
    {
      "contactNumber": "123",
      "rating": "1",
      "userName": "Shivam Chaurasia",
      "latitude": "12.9715987",
      "longitude": "77.5945627"
    },
    {
      "contactNumber": "12344",
      "rating": "0",
      "userName": "Shivam",
      "latitude": "12.83089930503908 ",
      "longitude": "77.66449077036145"
    }];
    _.each(looSeeds, function(obj){

      Loos.insert(obj);

    });

  });
}