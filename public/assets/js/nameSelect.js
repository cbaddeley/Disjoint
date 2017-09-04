//This one function is going to take the player name and store it with session storage so we can get it again

$("#beginForm").submit(function( event ) {
  event.preventDefault();
  sessionStorage.setItem("playerName", $("#playerNameInputField").val());
  var name = {
    player_name: $("#playerNameInputField").val()
  };
//Right here in the response from the server I redirect to the first level
  $.post("/api/playerName", name,
    function(data) {
      if (typeof data.redirect == 'string') {
          window.location = data.redirect;
        }
    });

});
