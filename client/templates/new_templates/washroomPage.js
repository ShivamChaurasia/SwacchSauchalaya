Meteor.startup(function() {
  Session.set("mapPage", true);
});

Template.washroomPage.helpers({
  requests : function(){
    return Requests.find().fetch();
  },
});

Template.washroomPage.events({
  
});
