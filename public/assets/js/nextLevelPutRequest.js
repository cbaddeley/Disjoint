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


//LINKING THE PORTAL TO THE NEXTLEVEL FUNCTION (STYLED BUTTON?)
//TRY CHANGING THE DIV NAME FOR THE BUTTON NAME



  //JQUERY FOR THE TICKER PLUGINS 

  //   jQuery(document).ready(function(){
  //   // Instantiate jTicker 
  //   jQuery("#ticker").ticker({
  //       cursorList:  " ",
  //       rate:        10,
  //       delay:       4000
  //   }).trigger("play").trigger("stop");

  //   // Trigger events 
  //   jQuery(".stop").click(function(){
  //       jQuery("#ticker").trigger("stop");
  //       return false;
  //   });
    
  //   jQuery(".play").click(function(){
  //       jQuery("#ticker").trigger("play");
  //       return false;
  //   });
    
  //   jQuery(".speedup").click(function(){
  //       jQuery("#ticker")
  //       .trigger({
  //           type: "control",
  //           item: 0,
  //           rate: 10,
  //           delay: 4000
  //       })
  //       return false;
  //   });
    
  //   jQuery(".slowdown").click(function(){
  //       jQuery("#ticker")
  //       .trigger({
  //           type: "control",
  //           item: 0,
  //           rate: 90,
  //           delay: 8000
  //       })
  //       return false;
  //   });
    
  //   jQuery(".next").live("click", function(){
  //       jQuery("#ticker")
  //       .trigger({type: "play"})
  //       .trigger({type: "stop"});
  //       return false;
  //   });

  //   jQuery(".style").click(function(){
  //       jQuery("#ticker")
  //       .trigger({
  //           type: "control",
  //           cursor: jQuery("#ticker").data("ticker").cursor.css({width: "4em", background: "#efefef", position: "relative", top: "1em", left: "-1em"})
  //       })
  //       return false;
  //   });
    
  // });
    // $(document).ready(function() {
    //     //when the player clicks the next button, the textbox div will show the next block of text
    //     jQuery(function($) {
    //         $('.newsticker').newsTicker({
    //             row_height: 48,
    //             max_rows: 2,
    //             speed: 600,
    //             direction: 'up',
    //             duration: 4000,
    //             autostart: 1,
    //             pauseOnHover: 0
    //         });
    //     });
        // $('#webTicker').webTicker([
        //    height:'75px', 
        //    duplicate:true, 
        //    rssfrequency:0, 
        //    startEmpty:false, 
        //    hoverpause:false, 
        //    transition: "ease"
        //  ]);
        // $("#nextBtn").on("click") {

        //     // $('#webTicker').webTicker();
        //     // $('.ticker').ticker();
        //     // addText();
        // };

    // });

    // function addText(){
    //   var textToAdd = "This is some text.  It fills in one character at a time.  When it gets to the end of the div, it wraps to the next line.  Modify the number at the end of the setInterval function to change the text typing speed! :-)";
    // var placeHolder = 0;
    // //put the text in a hidden div?
    // var textAdder = setInterval(function(){
    //     document.getElementById("textBox").innerHTML += textToAdd.charAt(placeHolder);
    //     if (++placeHolder == textToAdd.length){
    //         clearInterval(textAdder);
    //     }
    // }, 100);

    // $(#textBox).innerHTML(textAdder);

    // }

    //QUESTCHOICES CALCULATION JS

    //tallys up the number of correct and incorrect responses (the correct have a value of 1 in the buttons)
function countQuestions(){
  //check if selected and add the value of the radio buttons up
  checkQuestion("questChoices0");
  checkQuestion("questChoices1");
  checkQuestion("questChoices2");
  checkQuestion("questChoices3");
  checkQuestion("questChoices4");
  checkQuestion("questChoices5");
  checkQuestion("questChoices6");
  checkQuestion("questChoices7");
  checkQuestion("questChoices8");
  checkQuestion("questChoices9");
  checkQuestion("questChoices10");
  checkQuestion("questChoices11");
  checkQuestion("questChoices12");
  checkQuestion("questChoices13");
  checkQuestion("questChoices14");
  checkQuestion("questChoices15");

  //need to find incorrect, we have the total and the number correct total -correct?
   incorrect = totalQuestions - correct;
   // $("#scoreDisplay").text("Incorrect: " + incorrect  + " Correct: " + correct);

}

function checkQuestion(answer){
  
  if(document.getElementById(answer) != null && document.getElementById(answer).checked){
    
    //switch statement to check the values of the answers
    switch(answer){

      case "questChoices0":
        correct += questChoices0; 
        break;
      case "questChoices1":
        correct += questChoices1; 
        break;      

      case "questChoices2":
        correct += questChoices2; 
        break;

      case "questChoices3":
        correct += questChoices3; 
        break;  

      case "questChoices4":
        correct += questChoices4; 
        break;  

      case "questChoices5":
        correct += questChoices5; 
        break;  

      case "questChoices6":
        correct += questChoices6; 
        break;  

      case "questChoices7":
        correct += questChoices7; 
        break;

      case "questChoices8":
        correct += questChoices8; 
        break;

      case "questChoices9":
        correct += questChoices9 
        break;  

      case "questChoices10":
        correct += questChoices10; 
        break;  

      case "questChoices11":
        correct += questChoices11; 
        break;  

      case "questChoices12":
        correct += questChoices12; 
        break;  

      case "questChoices13":
        correct += questChoices13; 
        break;  

      case "questChoices14":
        correct += questChoices14; 
        break;

      case "questChoices15":
        correct += questChoices15; 
        break;

    }

    //correct += document.getElementbyId(answer).value;
  }
}
