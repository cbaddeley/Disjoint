//display data function to display text from the levels table

function displayData() {

  //display choices in individual divs in test space
  // $("#choicePrompt").text(choiceArray[0]);
  //Shows the player choice prompt
  // for (let i =0; i < 1; i++){
  //   var question = choiceArray[0];
  //       $(".testTitle").append(question);
  //     }
    /*hides the conversation div*/
  // $(".test").hide();
console.log("this is a preview of the script for this level:");
console.log("contents of the prArray[0]" + prArray[0]);
console.log("contents of the sfArray[0]" + sfArray[0]);
console.log("contents of the prArray[1]" + prArray[1]);
console.log("contents of the sfArray[1]" + sfArray[1]);
console.log("contents of the prArray[2]" + prArray[2]);
console.log("contents of the sfArray[2]" + sfArray[2]);

//SCRIPT FORMAT 
   $(".displayNP0").text(prArray[0]);
   $(".displaySF0").text(sfArray[0]);
   $(".displayNP1").text(prArray[1]);
   $(".displaySF1").text(sfArray[1]);
  $(".displayNP2").text(prArray[2]);
   $(".displaySF2").text(sfArray[2]);

delayQuestPrompt();
delayChoice();

}

//function to later display the question prompt for the player (after the delay choices)
function delayQuestPrompt(){
setTimeout(function(){
   $("#choicePrompt").text(choiceArray[0]);
   for (let i =0; i < 1; i++){
    var question = choiceArray[0];
        $(".testTitle").text(question);
      }
      $(".testTitle").show();
  // for (let i =0; i < 1; i++){
  //   var question = choiceArray[0];
  //       $(".testTitle").append(question);
  //     }
}, 3000)}



// function to make the choices for the player to select visible on a 25 sec 
function delayChoice(){
  // setTimeout()
  setTimeout(function(){
 // loop to provide choices for the player
    for (let i = 1; i < choiceArray.length; i++) {
    var choiceDiv = $("<div class='choiceSelector'>");
    choiceDiv.text(choiceArray[i]);
    choiceDiv.attr("data-value", i);
    // $(".testTitle").append(question);
    $(".test").append(choiceDiv);
  }
    // $(".test").show();
 //show the choices to be selected after 30 sec delay
}, 30000)}

function animateText(){
  // $('#webTicker').webTicker();
  $('.ticker').ticker({finishOnHover:false, cursorSpeed:10});
  $(".displayNP").hide();
  $(".displaySF").hide();

}

function animateShadow(){
  $("#displayShadow").animate({
      top: '10px',
      opacity: '1',
      height:'567px',
      // width: '200px', 
      easing: 'linear'
  });
   $("#displayShadow").show(5000);
   $("#displayShadow").hide();
  }

function displayFinalStats(){

//grab data from the games_db via $ajax call? or in the other getDataForLevel file?
// var currentURL = window.location.origin;
//   console.log(currentURL);
// $.get("/api/playerLevel/" + sessionStorage.getItem('playerName'), function(data){
// //display this data in the modal
// console.log("the player's current rep is:" + data.reputation);
// console.log("the player's current gold is" + data.gold);
console.log("the player's current rep is:" + currentRep);
console.log("the player's current rep is:" + currentGold);
//make the modal work on an event? after the dialogue?

    $("#displayGold").append(currentGold);
    $("#displayRep").append(currentRep);
    $("#myModal").modal('show');
// });
}

function playClick(){
var clickone = $("#mySoundClip")[0];
  $(".choiceSelector").mouseenter(function(){

    clickone.play();
    alert("clickone played!");
  }
  )};


//portal replacement (takes the place of former next level advancement button)
$("#portal").on("click", function( event ) {
  event.preventDefault();
  var data = {
    player_name: sessionStorage.getItem("playerName"),
    level: $("#portal").attr('data-value')
  };
  $.ajax({
          url: "/api/levelAccess",
          type: 'PUT',
          data: data,
          dataType: 'json',
          success: function(result) {
            if (typeof result.redirect == 'string') {
                window.location = result.redirect;
              }
          }
      });

});

$(".test").on("click", ".choiceSelector", function( event ) {
  event.preventDefault();
  var goldGained;
  var reputationGained;
  var choiceSelectedValue = $(this).attr('data-value');
  if (choiceSelectedValue == 1) {
    goldGained = currentGold + 50;
    reputationGained = currentRep + 10;
  } else if (choiceSelectedValue == 2) {
    goldGained = currentGold + 25;
    reputationGained = currentRep + 25;
  } else {
    goldGained = currentGold + 10;
    reputationGained = currentRep + 50;
  }

  var data = {
    player_name: sessionStorage.getItem("playerName"),
    gold: goldGained,
    reputation: reputationGained
  };
  $.ajax({
          url: "/api/goldRep",
          type: 'PUT',
          data: data,
          dataType: 'json',
          success: function(result) {
            // if (typeof result.redirect == 'string') {
            //     window.location = result.redirect;
            //   }
          }
      });

  //hide the test  div
  $(".test").hide(1000);
  //call the portal to appear to take user to the next page
  $("#portal").show(2000);
   $("#displayShadow").hide(2000);

});

