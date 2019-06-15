$(document).ready(function () {
    // Array that holds topics 
    var topics = [
        'Seinfeld', 'Duck Tales', 'The Office', 'Futurama',
        'Rick and Morty', 'Gladiator', 'Sponge Bob'
    ];

    // This function empties the buttons div, and then populates
    // it with newly created buttons from the topics array
    function generateButtons() {
        $('#buttons').empty();

        for (var i = 0; i < topics.length; i++) {
            var button = $('<button>');
            button.addClass('gif-button btn btn-default');
            button.attr('data-topic', topics[i]);
            button.text(topics[i]);
            $('#buttons').append(button);
        }
    }

    // Function that pulls data from giphy API once a topic button is clicked
    $(document).on('click', '.gif-button', function () {

        var searchQ = $(this).data('topic');
        var limit = 10;
        var apiKey = 'RPaK9Z4sSu8wS60vAUOVtsfL2gAI98u0&limit=10';
        var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' +
            searchQ + '&api_key=' + apiKey + '&limit=' + limit;

        // Empties the previous gifs
        $('#gifs').empty();

        $.ajax({
            url: queryURL,
            method: 'GET'
        }).done(function (response) {
            var results = response.data;

            // For loop to take JSON data and generate HTML to display gifs
            for (var i = 0; i < results.length; i++) {
                var panelDiv = $('<div class="gif-div panel panel-default pull-left">');
                var rating = results[i].rating;
                var panelFooter = $('<div class="panel-footer">').text('Rating: ' + rating);
                var image = $('<img class="gif panel-body">');
                var gifUrl = results[i].images.fixed_height.url;

                // pause and animate functionality for click events
                image.attr('src', gifUrl.replace('.gif', '_s.gif'));
                image.attr('data-still', gifUrl.replace('.gif', '_s.gif'));
                image.attr('data-animate', gifUrl.replace('_s.gif', '.gif'));
                image.attr('data-state', 'still');

                // These append the rating and image to the .gif-div
                panelDiv.append(image);
                panelDiv.append(panelFooter);

                $('#gifs').prepend(panelDiv);
            }
        });
    });

    // This allows text entered into the text field to be turned into a
    // search button once the submit button is clicked.
    $('#add-gif').on('click', function () {
        var gifSearch = $('#gif-search').val().trim();

        // Adds the new topic to the topics array
        topics.push(gifSearch);
        // Resets the text entered in the text field
        $('#add-gif-form')[0].reset();
        // Regenerates the buttons on the DOM
        generateButtons();
        return false;
    });

    // This handles the toggling of paused and animated gifs.
    $(document).on('click', '.gif', function () {
        var state = $(this).attr('data-state');

        if (state === 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });

    // Generates the initial buttons on the DOM
    generateButtons();
});