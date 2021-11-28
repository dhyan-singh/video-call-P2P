var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;


getUserMedia({ video: true, audio: true }, function (stream) {
    let video = document.createElement("video");
    video.srcObject = stream;

    // to mirror video
    video.style.cssText = "-moz-transform: scale(-1, 1); \
-webkit-transform: scale(-1, 1); -o-transform: scale(-1, 1); \
transform: scale(-1, 1); filter: FlipH;";

    video.play();
    document.getElementById('my_video').appendChild(video);
})