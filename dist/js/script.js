var audio = document.getElementById('audio');

const playPauseBtn = document.getElementById('pause-play');

const progressBall = document.getElementById('p-ind');

const remainingTime = document.getElementById('start-time');

const elapsedTime = document.getElementById('end-time');

const coverphoto = document.getElementById('cover')

const title = document.getElementById('title')

const author = document.getElementById('author')

var duration;

var startMinutes;
var endMinutes;

var startSeconds;
var endSeconds;

var paused = false;

var init = true


// playPauseBtn.addEventListener('click', ()=>{
//     if (paused) paused = false;
//     else paused = true;
// })

//pasue play function called on sub levels

function playPause() {

    if(init){
        calcAudioDuration();
        setTime();
        beginIndicatorMovement();
        init = false;
    }

    // pause and plays with icon change
    //play
    if (playPauseBtn.getAttribute('src') == './assets/icons/play-button.png') {
        paused = false;
        playPauseBtn.setAttribute('src', './assets/icons/pause-button.png');
        audio.play();
        playIndicator();
        
    } else { 
        //pause

        playPauseBtn.setAttribute('src', './assets/icons/play-button.png')
        audio.pause();
        pauseIndicator();
        paused = true;
    }
}

function calcAudioDuration() {
    duration = audio.duration;
    startMinutes = Math.floor(duration/60);
    startSeconds = Math.floor(duration - (startMinutes*60));
    endMinutes = 0;
    endSeconds = 0;
}

// function manageTime(params) {
    
// }

function setTime() {
    //placed here to handle offset - doesn't have to wait a sec b4 init display
    remainingTime.innerHTML = startMinutes.toString() + " : " + startSeconds.toString(); 
      elapsedTime.innerHTML = endMinutes.toString() + " : " + endSeconds.toString();
    
    var intervalId = setInterval(()=>{
        if(!paused){
            startSeconds --;
            endSeconds ++;
        }
      remainingTime.innerHTML = startMinutes.toString() + " : " + startSeconds.toString(); 
      elapsedTime.innerHTML = endMinutes.toString() + " : " + endSeconds.toString();
      
      if (startSeconds == 0) {
          if (startMinutes == 0) {
              endMinutes = 0;
              endSeconds = 0;
              clearInterval(intervalId);
          }
          if (startMinutes > 0) {
              startMinutes --;
              startSeconds = 60; //made 60 to handle -- on next loop
          }
      }
      if (endSeconds == 59) {
          endMinutes ++;
          endSeconds = -1; //made -1 to handle ++ on next loop
      }
    },1000);
}

function beginIndicatorMovement() {
    // progressBall.style.animation = `${duration}s linear progress-indicator-animation`;
    progressBall.style.animation = `${duration}s linear progress-indicator-animation`;
}

function pauseIndicator() {
    progressBall.style['animation-play-state'] = 'paused';
}

function playIndicator() {
    progressBall.style['animation-play-state'] = 'running';
}