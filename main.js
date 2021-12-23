const videoElem = document.getElementById("video");
const logElem = document.getElementById("log");
// const startElem = document.getElementById("start");
// const stopElem = document.getElementById("stop");
// Options for getDisplayMedia()

var displayMediaOptions = {
  video: {
    cursor: "always",
	facingMode: 'user'
  },
  audio: false
};

// Set event listeners for the start and stop buttons
document.addEventListener("keydown", function(evt) {
	// console.log(evt)
	if(evt.key=="Enter" && evt.ctrlKey==true) startCapture();
	else if(evt.key=="Escape") stopCapture();
}, false);


async function startCapture() {
  // logElem.innerHTML = "";

  try {
    videoElem.srcObject = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
    dumpOptionsInfo();
  } catch(err) {
    console.error("Error: " + err);
  }
}

function stopCapture(evt) {
  let tracks = videoElem.srcObject.getTracks();

  tracks.forEach(track => track.stop());
  videoElem.srcObject = null;
}

function dumpOptionsInfo() {
  const videoTrack = videoElem.srcObject.getVideoTracks()[0];

  console.info("Track settings:");
  console.info(JSON.stringify(videoTrack.getSettings(), null, 2));
  console.info("Track constraints:");
  console.info(JSON.stringify(videoTrack.getConstraints(), null, 2));
}

startCapture()

var video = document.createElement('video');
video.setAttribute('playsinline', '');
video.setAttribute('autoplay', '');
video.setAttribute('muted', '');
video.style.width = '200px';
video.style.height = '200px';

var facingMode = "user"; // Can be 'user' or 'environment' to access back or front camera (NEAT!)
var constraints = {
  audio: false,
  video: {
   facingMode: facingMode
  }
};

navigator.mediaDevices.getUserMedia(constraints).then(function success(stream) {
  video.srcObject = stream;
});

document.body.appendChild(video)