const videoElem = document.getElementById("video");
const logElem = document.getElementById("log");
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
  if(videoElem.srcObject==null) return
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

//startCapture()

var video = document.getElementById('userCamera');
var videoHeader = document.getElementById('userCameraheader');
camHide = JSON.parse(localStorage.camHide)
videoHeader.style.visibility = camHide?"hidden":"visible"
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

videoHeader.appendChild(video)

function askChannel(){
  channelID = prompt('Channel Id:','')
  if(channelID==null) return
  localStorage.channelID = channelID
  document.getElementById('streamChat').src = 'https://streamchat.fox3000.repl.co/?channel='+localStorage.channelID
}

if(localStorage.channelID) document.getElementById('streamChat').src = 'https://streamchat.fox3000.repl.co/?channel='+localStorage.channelID