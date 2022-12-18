let nowPlaying = document.querySelector('.now-playing');
let trackArt = document.querySelector('.track-art')
let trackName = document.querySelector('.track-name')
let trackArtist = document.querySelector('.track-artist')
let playpauseButton = document.querySelector('.playpause-track');
let nextButton = document.querySelector('.next-track');
let previousButton = document.querySelector('.previous-track');
let seekSlider = document.querySelector('.seek_slider');
let volumeSlider = document.querySelector('.volume_slider');
let currentTime = document.querySelector('.current-time');
let totalDuration = document.querySelector('.total-duration');
let wave = document.querySelector('wave');
let randomIcon = document.querySelector('.fa-random');
let currentTrack = document.createElement('audio');
let trackIndex = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;
const musicList = [
    {
        img: 'Media/fallingdown.png',
        name: 'Falling Down', 
        artist: 'Wid Cards',
        music: 'Music/music_fallingdown.mp3' 
    },
    {
        img: 'Media/faded.png',
        name: 'Faded', 
        artist: 'Alan Walker',
        music: 'Music/music_Faded.mp3'
    }, 
    {
        img: 'Media/ratherbe.png', 
        name: 'Rather Be',
        artist: 'Clean Bandit',
        music: 'Music/music_Rather be.mp3'
    },
    {
        img: 'Media/stay.png', 
        name: 'Stay',
        artist: 'Kid Laroi',
        music: 'Music/music_stay.mp3'
    }
];
loadTrack(trackIndex);
function loadTrack(trackIndex) {
    clearInterval(updateTimer);
    reset();
    currentTrack.src = musicList[trackIndex].music;
    currentTrack.load();
    trackArt.style.backgroundImage = "url(" + musicList[trackIndex].img + ")";
    trackName.textContent = musicList[trackIndex].name;
    trackArtist.textContent = musicList[trackIndex].artist;
    nowPlaying.textContent = "Playing " + (trackIndex + 1) + " of " + musicList.length;
    updateTimer = setInterval(setUpdate, 1000);
    currentTrack.addEventListener('ended', nextTrack);
    //randomBackgroundColor();
}
/*function randomBackgroundColor() {
    let hexValue = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
    let a;
    function populate(a) {
        for(let i=0; i < 6; i++) {
            let x = Math.round(Math.random() * 14);
            let y = hexValue[x];
            a = a + y;
        }
        return a;
    }
    let Color1 = populate('#');
    let Color2 = populate('#');
    var angle = 'to right';
    let gradient = 'linear-gradient(' +  angle + ',' + Color1 + ',' + Color2 + ")";
    document.body.style.background = gradient;
} */
function reset() {
    currentTime.textContent = "00:00";
    totalDuration.textContent = "00:00";
    seekSlider.value = 0;
}
function randomTrack() {
    if(isRandom == true) {
        pauseRandom();
    }
    else {
        playRandom();
    }
}
function pauseRandom() {
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}
function playRandom() {
    isRandom = true;
    randomIcon.classList.add('randomActive');
}
function repeatTrack() {
    let currentIndex = trackIndex;
    loadTrack(currentIndex);
    playTrack();
}
function playpauseTrack() {
    if (isPlaying == true) {
        pauseTrack();
    }
    else {
        playTrack();
    }
}
function playTrack() {
    currentTrack.play();
    isPlaying = true;
    trackArt.classList.remove('rotate');
    wave.classList.add('loader');
    playpauseButton.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack() {
    currentTrack.pause();
    isPlaying = false;
    trackArt.classList.remove('rotate');
    wave.classList.remove('loader');
    playpauseButton.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack() {
    if((trackIndex < musicList.length - 1) && (isRandom === false)) {
        trackIndex++;
    }
    else if ((trackIndex < musicList.length - 1) && (isRandom === true)) {
        let randomIndex = Number.parseInt(Math.random() * musicList.length);
        trackIndex = randomIndex;
    }
    else {
        trackIndex = 0;
    }
    loadTrack(trackIndex);
    playTrack();
}
function previousTrack() {
    if(trackIndex > 0) {
        trackIndex--;
    }
    else {
        trackIndex = musicList.length - 1;
    }
    loadTrack(trackIndex);
    playTrack();
}
function seekTo() {
    let seekTo = currentTrack.duraction * (seekSlider.value / 100);
    currentTrack.currentTime = seekTo;
}
function setVolume() {
    currentTrack.volume = volumeSlider.value / 100;
}
function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(currentTrack.duration)) {
        seekPosition = currentTrack.currentTime * (100 / currentTrack.duration);
        seekSlider.value = seekPosition;

        let currentMinutes = Math.floor(currentTrack.currentTime / 60);
        let currentSeconds = Math.floor(currentTrack.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(currentTrack.duration / 60);
        let durationSeconds = Math.floor(currentTrack.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds;}
        if(durationSeconds < 10) {durationSeconds = "0" + durationSeconds;}
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes;}
        if(durationMinutes < 10) {durationMinutes = "0" + durationMinutes;}

        currentTime.textContent = currentMinutes + ":" + currentSeconds;
        totalDuration.textContent = durationMinutes + ":" + durationSeconds;
    }
}