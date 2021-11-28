var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

// plays local video on 'my_video' div
getUserMedia({ video: true }, (stream) => {
    let video = document.createElement('video');
    video.srcObject = stream;

    // flip video
    video.style.cssText = "-moz-transform: scale(-1, 1); \
-webkit-transform: scale(-1, 1); -o-transform: scale(-1, 1); \
transform: scale(-1, 1); filter: FlipH;";


    video.play()
    if (document.getElementById('my_video').children[0] && document.getElementById('my_video').children[0].nodeName === 'VIDEO') {
        // div#my_video already has a video child element.
    } else {
        document.getElementById('my_video').appendChild(video);
    }
})

document.getElementById('call').addEventListener('click', () => {
    // calls & send local video stream
    getUserMedia({ video: true }, function (stream) {
        let otherPeerID = document.getElementById('other_peer_id_call').value;
        let call = peer.call(otherPeerID, stream);

        call.on('stream', function (remoteStream) {
            let remote_video = document.createElement('video');
            remote_video.srcObject = remoteStream;

            // flip video
            remote_video.style.cssText = "-moz-transform: scale(-1, 1); \
-webkit-transform: scale(-1, 1); -o-transform: scale(-1, 1); \
transform: scale(-1, 1); filter: FlipH;";

            remote_video.play();
            document.getElementById('remote_video').appendChild(remote_video);
        })
    })
})

// incoming call request
peer.on('call', function (call) {
    getUserMedia({ video: true }, function (localStream) {
        call.answer(localStream);
    })

    call.on('stream', function (remoteStream) {
        let remote_video = document.createElement('video');
        remote_video.srcObject = remoteStream;
        // flip video
        remote_video.style.cssText = "-moz-transform: scale(-1, 1); \
        -webkit-transform: scale(-1, 1); -o-transform: scale(-1, 1); \
        transform: scale(-1, 1); filter: FlipH;";

        remote_video.play();
        document.getElementById('remote_video').appendChild(remote_video);
    })
})