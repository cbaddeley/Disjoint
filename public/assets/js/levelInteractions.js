//display data function to display text from the levels table

function displayData() {

  //display choices in individual divs in test space
  $("#choicePrompt").text(choiceArray[0]);
  //Okay now for showing the choice prompt
  for (let i =0; i < 1; i++){
    var question = choiceArray[0];
        $(".testTitle").append(question);
    }
    /*hides the conversation div*/
  // $(".test").hide();
  console.log("contents of the prArray[0]" + prArray[0]);
console.log("contents of the sfArray[0]" + sfArray[0]);
console.log("contents of the prArray[1]" + prArray[1]);
console.log("contents of the sfArray[1]" + sfArray[1]);
console.log("contents of the prArray[2]" + prArray[2]);
console.log("contents of the sfArray[2]" + sfArray[2]);
// console.log("contents of the prArray[1]" + prArray[3]);
// console.log("contents of the sfArray[1]" + sfArray[3]);
  /*adds dialogues to the proper spaces*/
    $(".displayNP").append(prArray[0]);
   $(".displaySF").append(sfArray[0]);
   $(".displayNP").append(prArray[1]);
   $(".displaySF").append(sfArray[1]);
  $(".displayNP").append(prArray[2]);
   $(".displaySF").append(sfArray[2]);
     // $(".displayNP").append(prArray[3]);
}

function delayChoice(){
  // setTimeout()
  setTimeout(function(){
 /*loop to provide choices for the player*/
    for (let i = 1; i < choiceArray.length; i++) {
    var choiceDiv = $("<div class='choiceSelector'>");
    choiceDiv.text(choiceArray[i]);
    choiceDiv.attr("data-value", i);
    // $(".testTitle").append(question);
    $(".test").append(choiceDiv);
  }
  // $(".test").show();
  /*run on 20 sec delay*/
}, 20000)
}

function animateText(){
  // $('#webTicker').webTicker();
  $('.ticker').ticker({finishOnHover:false, cursorSpeed:50});
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
// $(".choiceSelector")
//   .each(function(i) {
//     if (i != 0) {
//       $("#mySoundClip")
//         .clone()
//         .attr("id", "beep-two" + i)
//         .appendTo($(this).parent());
//     }
//     $(this).data("beeper", i);
//   })
//   .mouseenter(function() {
//     $("#beep-two" + $(this).data("beeper"))[0].play();
//   });
// $("#beep-two").attr("id", "beep-two0");


  // var choiceHover = $(".choiceSelectorSound");
  //   var choiceClick = choicehover.find('audio')[0];

  //   choiceHover.hover(function(){
  //     choiceClick.play();
  //   }, function(){

  //     choiceClick.stop();
  //     alert("click!!!");
  //   });  

 
// $("#displayCongratsPhoto").html()
//LOOK INTO JPLAYER:  http://jplayer.org/
// function playClick(){
//   $(".choiceSelector")
//   // .each(function(i) {
//   //   if (i != 0) {
//   //     $("#beep-two")
//   //       .clone()
//   //       .attr("id", "beep-two" + i)
//   //       .appendTo($(this).parent());
//   //   }
//   //   $(this).data("beeper", i);
//   // })
//   .mouseenter(function() {
//     $("#beep-two" + $(this).data("beeper"))[0].play();
//   });
// // $("#beep-two").attr("id", "beep-two0");
// }

//OR     var audio = $("audio")[0];
    // audio.play();

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




// var resultDiv = $("<div class='resultDiv container-fluid row'>");
// var likeButton = $("<button class='btn-yes col-xs-4'>");
// var dislikeButton = $("<button class='btn-no col-xs-4'>");
// var moreInfoButton = $("<button class='btn-info col-xs-4'>");
// var resultDivName = $("<p class='row'>");
// moreInfoButton.text("Info");
// moreInfoButton.attr("data-toggle", "modal");
// moreInfoButton.attr("data-target", "#exampleModalLong");
// dislikeButton.text("Nope");
// likeButton.text("Like");
// resultDiv.attr(arr[i]);
// resultDiv.attr(arr[i].activities[0]);
// resultDiv.attr(arr[i].activities[0].unique_id);
// resultDivName.text(arr[i].name);
// resultDiv.append(resultDivName);
// resultDiv.append(dislikeButton);
// resultDiv.append(moreInfoButton);
// resultDiv.append(likeButton);
// $(".resultsContainer").append(resultDiv);
// }
