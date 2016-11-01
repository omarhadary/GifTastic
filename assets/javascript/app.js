 $(document).ready(function() {
    // create array of strings in variable called topics
    var topics = ["California", "New York", "Colorado", "Michigan", "Hawaii", "Alaska", "Montana"];
    // create buttons for the topics in the array using a loop that appends each button
    function showButtons() {
        for (var i = 0; i < topics.length; i++) {
            // $(".buttons").empty();
            var buttons = $("<button>");
            buttons.addClass("state");
            buttons.attr("data-name", topics[i]);
            buttons.text(topics[i]);
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
            console.log(queryURL);
            console.log(response);
            var results = response.data;
            for (var j = 0; j < results.length; j++) {
                var stateSpan = $("<span class='state-span'>");
                var stateGif = $("<img>");
                stateGif.attr("src", results[j].images.fixed_height_still.url);
                var rating = $("<p>");
                rating.text("Rating: " + results[j].rating);
                stateSpan.append(stateGif);
                stateSpan.append(rating);
                $(".gifs").prepend(stateSpan);
            }
        })
    }
    $(document).on('click', '.state', displayGif);
    showButtons();
    // when image is clicked switch to animated gif, when animated gif is clicked again switch back to still gif
    // Display rating under every gif
    // add a form to the page that takes the value from a user input box and adds to topics array
 });