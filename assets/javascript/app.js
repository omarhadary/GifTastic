 $(document).ready(function() {
    // create array of strings in variable called topics
    var topics = ["California", "Florida", "New York", "Texas", "Hawaii", "Washington", "Colorado", "Virginia", "North Carolina", "Arizona", "Montana", "Georgia", "Idaho"];
    // create buttons for the topics in the array using a loop that appends each button
    function showButtons() {
        $(".buttons").empty();
        for (var i = 0; i < topics.length; i++) {
            var buttons = $("<button>");
            buttons.addClass("state");
            buttons.attr("data-name", topics[i]);
            buttons.html(topics[i]);
            $(".buttons").append(buttons);
        }
    };
    // when a button is clicked, display 10 static gif images and place on page
    function displayGif() {
        $(".gifs").empty();
        var state = $(this).data("name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + state + "&api_key=dc6zaTOxFJmzC&limit=10";
        $.ajax({
                url: queryURL,
                method: "GET"
            }).done(function(response) {
                var results = response.data;
                for (var j = 0; j < results.length; j++) {
                    var stateSpan = $("<span class='state-span'>");
                    var stateGif = $("<img>");
                    stateGif.attr("src", results[j].images.fixed_height_still.url);
                    stateGif.addClass("gif");
                    // assign a still value to the current state of the gif
                    stateGif.attr("data-state", "still");
                    // assign the still and animate value to the gif
                    stateGif.attr("data-still", results[j].images.fixed_height_still.url);
                    stateGif.attr("data-animate", results[j].images.fixed_height.url);
                    // create the rating tag
                    var rating = $("<p class='rating-style'>");
                    var ratingUpperCase = results[j].rating.toUpperCase();
                    rating.html("Rating: " + ratingUpperCase);
                    // prepend the gif + rating to the page
                    stateSpan.append(stateGif);
                    stateSpan.append(rating);
                    $(".gifs").prepend(stateSpan);
                }
            })
            // create on click event handler to switch between still and animate gif state
        $(document).on("click", ".gif", function() {
            var state = $(this).attr('data-state');
            if (state === "still") {
                $(this).attr("src", $(this).data("animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).data("still"));
                $(this).attr("data-state", "still");
            }
        });
    }
    // create on click event handler to take user input and push to the topics array
    $("#add-state").on("click", function() {
            var userInput = $("#state-input").val().trim();
            var newState = userInput.replace(/\w\S*/g, function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
            topics.push(newState);
            $("#state-input").val("");
            // run function to show the topics buttons
            showButtons();
            // prevents page from refreshing when user submits input
            return false;
        })
        // create on click event handler to display the gift if any of the topic buttons are clicked
    $(document).on('click', ".state", displayGif);
    // run function to show the topics buttons
    showButtons();
 });