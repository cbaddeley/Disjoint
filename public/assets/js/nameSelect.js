//This one function is going to take the player name and store it with session storage so we can get it again

$("#beginForm").submit(function( event ) {
  event.preventDefault();
  sessionStorage.setItem("playerName", $("#input-1").val());
  var name = {
    player_name: $("#input-1").val()
  };
//Right here in the response from the server I redirect to the first level
  $.post("/api/playerName", name,
    function(data) {
      if (typeof data.redirect == 'string') {
          window.location = data.redirect;
        }
    });

});
