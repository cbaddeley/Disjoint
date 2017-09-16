var currentPlayerId;
var playerGold;
var playerRep;

$( document ).ready(function() {
  $.ajax({
  		method: "GET",
  		crossDomain: 'true',
  		url: "/api/playerLevel/" + sessionStorage.getItem("playerName")
  	}).done(function(response){
      currentPlayerId = response[0].id;
      playerGold = response[0].gold;
      playerRep = response[0].gold;
      $.ajax({
      		method: "GET",
      		crossDomain: 'true',
      		url: "/api/Backpack/" + currentPlayerId
      	}).done(function(response){
          console.log(typeof response);
          console.log(response[0]);
          moveShopToBackpack(response);

      	})
  	})

});

$(".shop").on("click", ".shopItem", function() {
  console.log($(this).val());
   var currentShopId = $(this).val();
     $(".ulBackpack").append($(this));
  $.post("/api/Backpack", {PlayerId:currentPlayerId,ShopId:currentShopId},
    function(data) {
      console.log(data);

    });
});

function moveShopToBackpack(arr) {
  for (var i = 0; i <arr.length; i++) {
    $(".ulBackpack").append($("#item" + arr[i].ShopId));
    console.log(arr[i].ShopId);
  }
}
