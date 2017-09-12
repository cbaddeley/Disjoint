$(".hexagon").click(function() {
  if ($(this).find("a").attr("href")) {
    window.location = $(this).find("a").attr("href");
    return false;
  }
});

$( document ).ready(function() {
  $.ajax({
  		method: "GET",
  		crossDomain: 'true',
  		url: "/api/playerLevel/" + sessionStorage.getItem("playerName")
  	}).done(function(response){
  		revealLevels(response[0].level_access);
      removeClicks(response[0].level_access);
  	})

});

function revealLevels(num) {
  var number = parseInt(num);
  for (i = 1; i <= number; i++) {
    $("#level" +i).show();
  }
}

$("#3").text("Market");

for (var i = 1; i <= 7; i++) {
  if (i >= 4) {
    var newNum = i -1;
    $("#" + i).text("Level " + newNum);
  }
}
function removeClicks(num) {
  var number = parseInt(num);
  for (var k = 1; k <= number; k++) {
    if (k > 1 && k != 4) {
      var newNum = k - 1;
      $("#href" + newNum).remove();
      $("#level" + newNum).css("opacity", 0.5);
    }
  }
}
