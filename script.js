/*function nextTrack() {
    var currentIndexInput = document.querySelector('input[name="indexValue"]');
    var currentIndex = parseInt(currentIndexInput.value);
    currentIndex += 1; // Increment the current index
    currentIndexInput.value = currentIndex; // Update the input value
    document.querySelector('form').submit(); // Submit the form
}*/
 
/*function nextTrack() {
    var currentIndexInput = document.querySelector('input[name="indexValue"]');
    var currentIndex = parseInt(currentIndexInput.value);
    currentIndex += 1; // Increment the current index
    currentIndexInput.value = currentIndex; // Update the input value
    document.querySelector('form').submit(); // Submit the form
}*/

const token = 'YOUR_ACCESS_TOKEN'; // Replace with a valid access token
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
player.connect();
