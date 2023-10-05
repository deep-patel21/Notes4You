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
        }

        let url = `https://www.youtube.com/embed?search=${encodeURIComponent(searchQuery)}`;
        window.open(url, '_blank');
    }

    search.onclick = loadYouTubeVideo;

    function searchYouTubeVideo(trackName, artistName) {
        const apiKey = "placholder"; 
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

