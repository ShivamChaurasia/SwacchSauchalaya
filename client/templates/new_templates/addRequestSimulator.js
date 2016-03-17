Meteor.startup(function() {

});

Template.addRequestSimulator.helpers({
  washRooms : function(){
  	var allWashrooms = [];
  	_.map(Loos.find().fetch(),function(value){
  		_.map(value.subWashrooms,function(v){
  			allWashrooms.push({name: v.id});
  		});
  	});
    return allWashrooms;
  },
});

Template.addRequestSimulator.events({
  'submit': function(event, template) {

  	event.preventDefault();

  	var self = this,
  		selectedCabin = $(event.target).find('[name=item] option:selected').val(),
  		type = $(event.target).find('[name=type]:checked').attr('value');

  	console.log("Type", type);
  	console.log("Selected", selectedCabin);
  	
  	 Meteor.call('createRequest', {
  	   subWashroomId: selectedCabin,
  	   type:type,
  	   status:"Open"
  	 }, function(error, result) {
  	   if (error) {
  	     alert(error.reason);
  	   } else {
  	    
  	    Template.appBody.addNotification({
  	      action: 'View',
  	      title: 'Your photo was shared.',
  	      callback: function() {
  	         Session.set(IMAGE_KEY, null);
  	         Router.go('feed');
  	        // Template.recipe.setTab('feed');
  	      }
  	    });
  	    Session.set("ADDRESS_KEY", true);
  	    Overlay.close();
  	    }
  	 });
  	
  }
});
