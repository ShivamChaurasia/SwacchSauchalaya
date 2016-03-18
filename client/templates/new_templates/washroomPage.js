Meteor.startup(function() {
  Session.set("mapPage", true);
  Session.set('FROMSIMULATOR',false);
});

Template.washroomPage.helpers({
  requests : function(){
    return Requests.find().fetch();
  },
  selectedLoo : function(){
  	var selectedLoo = _.filter(Loos.find().fetch(),function(value){ return value.tID === Session.get('SELECTEDLOO')})[0];
  	var dataArray = [];
  	selectedLoo.subWashrooms.map(function(sub){
  		var obj={};
  		var requestsForSub = _.filter(Requests.find().fetch(),function(v){ 
  			return v.subWashroomId === sub.id && v.status === "Open";
  		});
  		var cleanRequests = _.filter(requestsForSub,function(v){ 
  			return v.type === "Clean";
  		});
  		dataArray.push({
  			name:sub.id.split(":")[1].trim(),
  			openRequests:requestsForSub.length,
  			cleanRequests:cleanRequests.length,
  			maintenanceRequests:requestsForSub.length-cleanRequests.length,
  		});
  	});
  	return dataArray;
  },
  mainWRName : function(){
  	return Session.get('SELECTEDLOO');
  }
});

Template.washroomPage.events({
  
});


if (Meteor.isClient) {
  Template.washroomPage.onRendered(function () {

    var initializing = true;
      Requests.find().observeChanges({
        added: function(id, doc) {
          if (!initializing) {
            Template.appBody.addNotification({
              action: 'Close',
              title: 'Clean Request Raised',
              callback: function() {
                 Router.go('feed');
              }
            });
          }
        }
      });
      initializing = false;

        // Requests.find().observe({
        //   added: function (document) {
        //     if (Session.get('FROMSIMULATOR')) {
        //       Template.appBody.addNotification({
        //         action: 'Close',
        //         title: 'Clean Request Raised',
        //         callback: function() {
        //            Router.go('feed');
        //         }
        //       });
        //     }
        //   },
        //   changed: function (newDocument, oldDocument) {
        //     // alert("changed");
        //   },
        //   removed: function (oldDocument) {
        //     // alert("removed");
        //   }
        // });
  });
}