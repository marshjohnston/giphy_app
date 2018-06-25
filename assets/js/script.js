
var topics = ["puppies", "kitties", "horses", "frogs", "kangaroo", "sloth", "dolphins", "hamster"];
var topicId = 0; 


    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topics[topicId] + "&api_key=AGOnLXwDOWiIu3oC7OMWNFsQCMAElFt4&limit=10";
    
    $.ajax({
        url: queryURL,
        method: "GET"
        
    }).then(function(response){ 

        $("#addGifBtn").on("click", function() {

            event.preventDefault(); 
            var newGiphy = $("#giphy-input").val();
            topics.push(newGiphy);
            console.log("newgiphy value: " + newGiphy);
            createButtons(); 
        
        });

        $(".cbutton").on("click", function () {

            // event.preventDefault(); 

            var val = $(this).attr("data-name");
            console.log("button value: " + topicId);
            createGifs(); 
        
        })

            //create as many buttons as there are arrays and append to the buttons div 
        function createButtons() {

            $("#buttons").empty(); 

            for (var i = 0; i < topics.length; i++) {
                
                var giphyBtn = $("<button>").html(topics[i]);
                giphyBtn.attr("data-name", topics[i]);
                giphyBtn.addClass("cbutton");
                $("#buttons").append(giphyBtn);
            };
        };
            //create an image with the image src for a fixed gif
        function createGifs() {

            $("#gifs").empty(); 

            for (var i = 0; i < 11; i++)  {
                var giphyBox = $("<img>").attr("src", response.data[i].images.fixed_height_small.url);
                
                $("#gifs").append(giphyBox);
                                
            };
        };

            createButtons();
            createGifs(); 
    
    });








// to create a button, give it a class. 

// when you click on a button, identify the id of that button and use the following