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