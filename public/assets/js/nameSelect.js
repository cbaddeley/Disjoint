$("#playerNameButton").on("click", function() {
  sessionStorage.setItem("playerName", $("#playerNameInputField").val());
});
