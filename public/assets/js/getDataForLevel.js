var choiceArray = [];
var prArray = [];
var sfArray = [];
var currentGold;
var currentRep;

//Ajax request
$( document ).ready(function() {
  var windowUrl = window.location.href;
  var lastChar = windowUrl[windowUrl.length -1];
  $.ajax({
  		method: "GET",
  		crossDomain: 'true',
  		url: "/api/levelInfo/" + lastChar
  	}).done(function(response){
      console.log(response);
      //grabs the values for the choices and dialogue for each scenario
      choiceArray = (response[0].choices).split("@");
      console.log("these are choices:" + choiceArray);
//consider makign this just a dialogue column with the split between speakers?
      prArray = (response[0].player_dialog).split("@");
      console.log("this is player:" + prArray);

      sfArray = (response[0].sf_dialog).split("@");
       console.log("this is villain"+ sfArray);
      // console.log(choiceArray);
      //Test for something
      //push quest choices to the question space
      $("#test").html(prArray[0]);

      //NP dialogue
      $('#displayNP').html(sfArray[0]);
      //SF dialogue
      $('#displaySF').html(choiceArray[0]);
      //push dialog choices to the dialog textbox space
      displayData();
      delayChoice();
      animateText();
      // playclick();
      //animate the shadow figure and dialogue
      animateShadow();
      // playclick();
      })
});

//This is going to get the user's current gold and reputationGained
$( document ).ready(function() {
  $.ajax({
  		method: "GET",
  		crossDomain: 'true',
  		url: "/api/playerLevel/" + sessionStorage.getItem("playerName")
  	}).done(function(response){
  		currentRep = response[0].reputation;
      currentGold = response[0].gold;
  	})

});

// 
// $(document).ready(function(){
// resizeDiv();
// });
//
// window.onresize = function(event) {
// resizeDiv();
// }
//
// function resizeDiv() {
// vpw = $(window).width();
// vph = $(window).height();
// $('.container-fluid').css({'height': vph + 'px'});
// }
