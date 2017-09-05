$(".hexagon").click(function() {
  window.location = $(this).find("a").attr("href");
  return false;
});

$( document ).ready(function() {
  $.ajax({
  		method: "GET",
  		crossDomain: 'true',
  		url: "/api/playerLevel/" + sessionStorage.getItem("playerName")
  	}).done(function(response){
  		revealLevels(response[0].level_access);
  	})

});

function revealLevels(num) {
  var number = parseInt(num);
  for (i = 0; i <= number; i++) {
    $("#level" +i).show();
  }
}
