//display data fucntion to display text from the llevels table

function displayData() {
  $("#choicePrompt").text(choiceArray[0]);
  for (let i = 1; i < choiceArray.length; i++) {
    var choiceDiv = $("<div class='choiceSelector'>");
    choiceDiv.text(choiceArray[i]);
    choiceDiv.attr("data-value", i);
    $(".test").append(choiceDiv);
  }
}


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
    goldGained = 50;
    reputationGained = 10;
  } else if (choiceSelectedValue == 2) {
    goldGained = 25;
    reputationGained = 25;
  } else {
    goldGained = 10;
    reputationGained = 50;
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
            if (typeof result.redirect == 'string') {
                window.location = result.redirect;
              }
          }
      });
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
