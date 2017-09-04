$("#nextLevel").submit(function( event ) {
  event.preventDefault();
  var data = {
    player_name: sessionStorage.getItem("playerName"),
    level: $("#level").val()
  };
  console.log(data);
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
