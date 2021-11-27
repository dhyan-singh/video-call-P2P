//TODO: change host before deploying
// var peer = new Peer({secure: true, host: 'codegroupshare.herokuapp.com', port:443, path:'/myapp'});

//FIXME: only for localhost
var peer = new Peer({host: 'localhost', port:8080, path:'/myapp'})

// when peer is connected to peerserver this code will run
peer.on('open', function() {
    document.getElementById('my_peer_id').innerHTML = 'My PeerID: ' + peer.id;
    // alert(`Your Peer ID is : ${peer.id}`);
})

// DOM manipulation starts here delete if not like this
// click to copy for [my_peer_id]
document.getElementById('my_peer_id').addEventListener('click', () => {
    navigator.clipboard.writeText(document.getElementById('my_peer_id').innerText.substring(11));
})