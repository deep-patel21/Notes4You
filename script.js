//document.addEventListener('DOMContentLoaded', function () {
        /*function nextTrack() {
        var currentIndexInput = document.querySelector('input[name="indexValue"]');
        var currentIndex = parseInt(currentIndexInput.value);
        currentIndex += 1; // Increment the current index
        currentIndexInput.value = currentIndex; // Update the input value
        document.querySelector('form').submit(); // Submit the form
    }*/

    /*const token = 'YOUR_ACCESS_TOKEN'; // Replace with a valid access token
    const player = new Spotify.Player({
    name: 'Your Player Name',
    getOAuthToken: (cb) => { cb(token); }
    });

    // Error handling
    player.addListener('initialization_error', ({ message }) => { console.error(message); });
    player.addListener('authentication_error', ({ message }) => { console.error(message); });
    player.addListener('account_error', ({ message }) => { console.error(message); });
    player.addListener('playback_error', ({ message }) => { console.error(message); });

    // Playback status updates
    player.addListener('player_state_changed', (state) => { console.log(state); });

    // Ready
    player.addListener('ready', ({ device_id }) => {
    console.log('Ready with Device ID', device_id);
    });

    // Connect to the player
    player.connect(); */


   /* var accessToken = "{{ access_token }}";
    let query = document.querySelector('.query');
    let search = document.querySelector('.search');


    // This function will create and load the YouTube player when you click the search button.
    function loadYouTubeVideo() {
        let trackName = "{{ track_name_html }}";
        let artistName = "{{ artist_name_html }}";
        let searchQuery = `${trackName} ${artistName} piano tutorial youtube`;

        // Create a new YouTube player with the specified video search query.
        new YT.Player(videoFrame, {
            height: '497.81',
            width: '885',
            videoId: '', // You can set the videoId here once you have it.
            playerVars: {
                'origin': window.location.origin,
                'enablejsapi': 1
            },
            events: {
                'onReady': onPlayerReady
            }
        });

        function onPlayerReady(event) {
            // You can use the event to control the player, e.g., play the video.
        }

        let url = `https://www.youtube.com/embed?search=${encodeURIComponent(searchQuery)}`;
        window.open(url, '_blank');
    }

    search.onclick = loadYouTubeVideo;


    function searchYouTubeVideo(trackName, artistName) {
        const apiKey = "AIzaSyA1W1IK4tSMp8EvQLn-FYfe9sFXQgHTIps";
        const query = `${trackName} ${artistName} piano tutorial`;
        const maxResults = 1; // You can adjust this value to get more results if needed
    
        const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&type=video&maxResults=${maxResults}&q=${query}`;
    
        fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            const videoId = data.items[0].id.videoId;
            // Use the videoId to embed the YouTube video in your HTML
            const iframe = document.getElementById('video-frame');
            iframe.src = `https://www.youtube.com/embed/${videoId}`;
        })
        .catch((error) => {
            console.error('Error fetching YouTube data:', error);
        });
    }
    
    
    // Call the function with track and artist names
    let trackName = '{{ track_name_html }}';
    let artistName = '{{ artist_name_html }}';
    let videoFrame = document.getElementById('video-frame');
    searchYouTubeVideo(trackName, artistName);
    
    


    //AIzaSyA1W1IK4tSMp8EvQLn-FYfe9sFXQgHTIps
}); */

document.addEventListener('DOMContentLoaded', function () {
    var accessToken = "{{ access_token }}";
    let query = document.querySelector('.query');
    let search = document.querySelector('.search');

    function loadYouTubeVideo() {
        let trackName = "{{ track_name_html }}";
        let artistName = "{{ artist_name_html }}";
        let searchQuery = `${trackName} ${artistName} piano tutorial youtube`;

        new YT.Player(videoFrame, {
            height: '497.81',
            width: '885',
            videoId: '',
            playerVars: {
                'origin': window.location.origin,
                'enablejsapi': 1
            },
            events: {
                'onReady': onPlayerReady
            }
        });

        function onPlayerReady(event) {
            // You can use the event to control the player, e.g., play the video.
        }

        let url = `https://www.youtube.com/embed?search=${encodeURIComponent(searchQuery)}`;
        window.open(url, '_blank');
    }

    search.onclick = loadYouTubeVideo;

    function searchYouTubeVideo(trackName, artistName) {
        const apiKey = "AIzaSyA1W1IK4tSMp8EvQLn-FYfe9sFXQgHTIps"; // Replace with your API key
        const query = `${trackName} ${artistName} piano tutorial`;
        const maxResults = 1;

        const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&type=video&maxResults=${maxResults}&q=${query}`;

        fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            const videoId = data.items[0].id.videoId;
            const iframe = document.getElementById('video-frame');
            iframe.src = `https://www.youtube.com/embed/${videoId}`;
        })
        .catch((error) => {
            console.error('Error fetching YouTube data:', error);
        });
    }

    let trackName = document.getElementById('track-name').textContent;
    let artistName = document.getElementById('artist-name').textContent;
    let videoFrame = document.getElementById('video-frame');
    searchYouTubeVideo(trackName, artistName);
});

