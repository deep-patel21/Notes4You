let nowPlaying = document.querySelector('.now-playing');
let trackArt = document.querySelector('.track-art')
let trackName = document.querySelector('.track-name')
let trackArtist = document.querySelector('.track-artist')
let trackVideo = document.querySelector('.videoSpecs')
let playpauseButton = document.querySelector('.playpause-track');
let nextButton = document.querySelector('.next-track');
let previousButton = document.querySelector('.previous-track');
let seekSlider = document.querySelector('.seek_slider');
let volumeSlider = document.querySelector('.volume_slider');
let currentTime = document.querySelector('.current-time');
let totalDuration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let currentTrack = document.createElement('audio');
let currentVideo = document.createElement('video');
let trackIndex = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;
const musicList = [
/*  {
        img: 'Media/',
        name: '',
        artist: '', 
        music: 'Music/',
        video: ''
    }                   */
    {
        img: 'Media/avengers.png',
        name: 'The Avengers Theme Song',
        artist: 'Alan Silvestri', 
        music:  'Music/avengers-alan-silvestri.mp3', 
        video: 'https://www.youtube.com/embed/dx9sB9y0Rm4'
    },
    {
        img: 'Media/apexlegends.png',
        name: 'Apex Legends Theme Song',
        artist: 'Stephen Barton', 
        music: 'Music/apex-legends-stephen-barton.mp3',
        video: 'https://www.youtube.com/embed/yu64jP4PQwg' 
    }, 
    {
        img: 'Media/ratherbe.png', 
        name: 'Rather Be',
        artist: 'Clean Bandit',
        music: 'Music/rather-be-clean-bandit.mp3',
        video: 'https://www.youtube.com/embed/AyCcvKoZ6KI'
    },
    {
        img: 'Media/stay.png', 
        name: 'Stay',
        artist: 'The Kid Laroi',
        music: 'Music/stay-the-kid-laroi.mp3',
        video: 'https://www.youtube.com/embed/XGYK2gqkRag'
    },
    {
        img: 'Media/blindinglights.png', 
        name: 'Blinding Lights',
        artist: 'The Weeknd',
        music: 'Music/blinding-lights-the-weeknd.mp3',
        video: 'https://www.youtube.com/embed/nWis_uYXANk'
    },
    {
        img: 'Media/shapeofyou.png',
        name: 'Shape of You',
        artist: 'Ed Sheeran', 
        music: 'Music/shape-of-you-ed-sheeran.mp3',
        video: 'https://www.youtube.com/embed/g32vXVgvS7Y'
    },
    {
        img: 'Media/attention.png',
        name: 'Attention', 
        artist: 'Charlie Puth',
        music: 'Music/attention-charlie-puth.mp3',
        video: 'https://www.youtube.com/embed/M0sttjJN_CY'
    },
    {
        img: 'Media/2step.png',
        name: '2Step',
        artist: 'Ed Sheeran (feat. Lil Baby)', 
        music: 'Music/2step-ed-sheeran.mp3',
        video: 'https://www.youtube.com/embed/5AGFRfxc-eQ'
    },
    {
        img: 'Media/ironman3.png',
        name: 'Iron Man 3 Theme Song',
        artist: 'Brian Tyler', 
        music: 'Music/iron-man-3-brian-tyler.mp3',
        video: 'https://www.youtube.com/embed/q7oF-wrvyDk'
    },
    {
        img: 'Media/levitating.png',
        name: 'Levitating',
        artist: 'Dua Lipa (feat. DaBaby)', 
        music: 'Music/levitating-dua-lipa.mp3',
        video: 'https://www.youtube.com/embed/DgNZmpLLh0w'
    },
    {
        img: 'Media/madcondontworry.png',
        name: "Don't Worry",
        artist: 'Madcon (feat. Ray Dalton)', 
        music: 'Music/dont-worry-madcon.mp3',
        video: 'https://www.youtube.com/embed/B1YeAfMNUmk'
    },
    {
        img: 'Media/faded.png',
        name: 'Faded', 
        artist: 'Alan Walker',
        music: 'Music/faded-alan-walker.mp3',
        video: 'https://www.youtube.com/embed/Nk6_9kDyo0w'
    },
    {
        img: 'Media/countingstars.png',
        name: 'Counting Stars',
        artist: 'OneRepublic', 
        music: 'Music/counting-stars-one-republic.mp3',
        video: 'https://www.youtube.com/embed/8r7CUCnNJmQ'
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
    currentVideo.src = musicList[trackIndex].video;
    currentVideo.load();
    trackVideo.src = musicList[trackIndex].video;
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
    currentTrack.volume = (volumeSlider.value / 100);
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
function getTrackName() {
    return musicList[trackIndex].name;
}