var choiceArray = [];
var prArray = [];
var sfArray = [];

//Ajax request
$( document ).ready(function() {
  var windowUrl = window.location.href;
  var lastChar = windowUrl[windowUrl.length -1];
  $.ajax({
  		method: "GET",
  		crossDomain: 'true',
  		url: "/api/levelInfo/" + lastChar
  	}).done(function(response){
      //grabs the values for the choices and dialogue for each scenario
      choiceArray = (response[0].choices).split("@");
      prArray = (response[0].player_dialog).split("@");
      sfArray = (response[0].sf_dialog).split("@");

      //Test for something
      //push quest choices to the question space
      $("#test").text(prArray[0]);
      //push dialog choices to the dialog textbox space
      displayData();
  	})
});
