Meteor.startup(function() {
  Session.set("languageSelected", false);
  Session.set("SELECTEDLOO", "RajivChowk_Metro_Gate_1");
});
Template.home.helpers({
  languageSelected: function(){
    return Session.get("languageSelected");
  },
  classforPopUp: function(){
    if (Session.get("languageSelected")) {
      return "hide";
    } else {
      return "popupWrapper"
    }
  }
});

Template.home.events({
  'click input': function(event, template){
    console.log(event);
    Session.set("languageSelected", true);
  }
});
