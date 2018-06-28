// 3 issues to solve. 

// 1. cant prevent button from going if blank
// 2. cant organize gif rating and blocks 
// 3. do i need a remove button?
// 4. I need to initalize with a gif
var topics = ["Obama", "Lebron", "Cash", "AFV", "kangaroo", "sloth", "dolphins", "hamster"];
var counter = 0; 

function createButtons() {
    
    $("#buttons").empty(); 
    
    for (var i = 0; i < topics.length; i++) {
        //just added the css elements this way to see how they all reacted
        var giphyBtn = $("<button>").html(topics[i]);
        giphyBtn.attr("data-name", topics[i]);
        giphyBtn.css("text-transform", "uppercase");
        giphyBtn.css("margin", "5px");
        giphyBtn.css("background-color", "#202A25");
        giphyBtn.css("color", "white");
        giphyBtn.css("text-align", "center");
        giphyBtn.addClass("cbutton");
        $("#buttons").append(giphyBtn);
    };
};
    
    $("#addGifBtn").on("click", function () {
        event.preventDefault(); 

        var newTopic = $("#giphy-input").val().trim(); 

        if (newTopic != "") {
        topics.push(newTopic);
        console.log("new topic: " + newTopic);
        console.log("topics array: " + topics);
        createButtons(); 
        $("#giphy-input").val(""); 
        } else { 
            alert("Please do yourself a favour and actually enter something in the input box...")
        };
    });
// };

function getGifs() {
    // this is the key to the solution right here I believe
    var newTopic = $(this).attr("data-name");
    
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + newTopic + "&api_key=AGOnLXwDOWiIu3oC7OMWNFsQCMAElFt4&limit=10";
    
    $.ajax({
        url: queryURL,
        method: "GET"
        
    }).then(function(response){ 
        $("#gifs").empty();
            
            for (var i = 0; i < response.data.length; i++)  {
                
                var theGif = $("<img>");
                theGif.addClass("theGif");
                theGif.attr("src",          response.data[i].images.fixed_height_still.url);
                theGif.attr("data-still",   response.data[i].images.fixed_height_still.url)
                theGif.attr("data-animate", response.data[i].images.fixed_height.url);
                theGif.attr("data-state", "still");

                // need to find a way to append to a relative position of the img element. 
                var gifRating = $("<div>");
                gifRating.html("GIF Rating: " + response.data[i].rating);
                gifRating.addClass("gifRating");
                gifRating.css("text-transform", "uppercase")  

                var gifContainer = $("<div>").addClass("gif");
                 gifContainer.append(theGif);
                 gifContainer.append(gifRating);

                 $("#gifs").append(gifContainer);
                
                // gifRating)
                
            };
            
        });
    };
    createButtons(); 
    getGifs(); 
    // addButton(); 

    $(document).on("click", ".cbutton", getGifs);
    $(document).on("click", ".theGif", function() {

        if ($(this).attr("data-state") === "still") {
            
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else { 

            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", $(this).attr("still"));
            
        }
    });
