const videoPlayer = document.getElementById("player-video");
const playIcon = document.querySelector(".play-icon");
const pauseIcon = document.querySelector(".pause-icon");
const muteInactiveIcon = document.querySelector(".mute-inactive");
const muteActiveIcon = document.querySelector(".mute-active");
const volumenBar = document.getElementById("volumen-range");
let currentVolume = videoPlayer.volume;
const spinner = document.getElementById("spinner-wrapper");
let file;

if (window.File && window.FileReader && window.FileList) {
  console.log("Todas las APIs soportadas");
} else {
  alert(
    "La API de FILE no es soportada en este navegador. Puedes probar con otro 🤞1"
  );
}

//UPLOAD FILE FUNCTIONALITY
function handleUploadedFile(e) {
  spinner.classList.remove("hidden");
  setTimeout(function () {
    file = e.target.files[0];

    if (!file) {
      alert("There is not a file. You can upload a supported video 😅");
      stopSpinner();
    } else if (!file.type.match("video.*")) {
      alert("Need to upload a supported video format 🙈");
      stopSpinner();
    } else {
      let reader = new FileReader();

      reader.onload = function (event) {
        let src = document.createAttribute("src");
        src.value = event.target.result;
        videoPlayer.setAttributeNode(src);
      };

      reader.readAsDataURL(file);
      spinner.classList.add("hidden");
    }
  }, 2000);
}

stopSpinner = () => {
  spinner.classList.add("hidden");
};

//VIDEO PLAYER FUNCTIONALITY
const handlePlayOrPauseVideo = () => {
  if (file && !videoPlayer.paused) {
    videoPlayer.pause();
    videoPlayer.classList.add("video-not-playing");
    pauseIcon.classList.add("hidden");
    playIcon.classList.remove("hidden");
  } else if (file && videoPlayer.paused) {
    videoPlayer.play();
    videoPlayer.classList.remove("video-not-playing");
    playIcon.classList.add("hidden");
    pauseIcon.classList.remove("hidden");
  }
};

const handleStopVideo = () => {
  videoPlayer.load();
  videoPlayer.pause();
  handleReturnAllFromZero();
};

const handleReturnAllFromZero = () => {
  pauseIcon.classList.add("hidden");
  playIcon.classList.remove("hidden");
  muteActiveIcon.classList.add("hidden");
  muteInactiveIcon.classList.remove("hidden");
};

const handleMute = () => {
  if (videoPlayer.volume <= 0) {
    videoPlayer.volume = currentVolume;
    volumenBar.value = currentVolume;
    muteInactiveIcon.classList.add("hidden");
    muteActiveIcon.classList.remove("hidden");
  } else {
    videoPlayer.volume = 0;
    volumenBar.value = 0;
    muteActiveIcon.classList.add("hidden");
    muteInactiveIcon.classList.remove("hidden");
  }
};

const handleChangeVolume = (e) => {
  videoPlayer.volume = e.target.value;
};

volumenBar.addEventListener("input", handleChangeVolume, true);
