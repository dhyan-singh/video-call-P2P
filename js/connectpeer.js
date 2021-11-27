//TODO: change host before deploying
// var peer = new Peer({secure: true, host: 'codegroupshare.herokuapp.com', port:443, path:'/myapp'});

//FIXME: only for localhost
var peer = new Peer({host: 'localhost', port:8080, path:'/myapp'})

// when peer is connected to peerserver this code will run
peer.on('open', function() {
    document.getElementById('my_peer_id').innerHTML = 'My PeerID: ' + peer.id;
    // alert(`Your Peer ID is : ${peer.id}`);
})

var conns = [];

peer.on('connection', function(con) {

    // when connection has been established with the peer(con here)
    con.on('open', function() {
        let peeridlist = []; // list of connected peers
        for (let x of conns) {
            peeridlist.push(x.peer);
        }
        con.send({dataType: 'PeerIDList', payload: peeridlist})
        conns.push(con)
        update_listeners();
    })
})


document.getElementById('connect').addEventListener('click', function() {
    let otherPeerID = document.getElementById('other_peer_id').value; 

    conns.push(peer.connect(otherPeerID));
    update_listeners();
})

function update_listeners() {
    for (let i = 0; i < conns.length; i++) {
        conns[i].on('data', function(data) {
            if (data.dataType === 'PeerIDList') {
                let peerlist = []
                for (let conv of conns) {
                    peerlist.push(conv.peer);
                }
                for (let peer_id of data.payload) {

                    // below commented codes where used to get which data we got from
                    // which peerID (for debugging).
                    // console.log(`${data.payload} -> ${peer_id} -> ${data}`)
                    // console.log(`PeerID:${peer_id}`)
                    
                    if (peerlist.includes(peer_id)) {
                        // do nothing
                    } else { // add new peerIDs
                        conns.push(peer.connect(peer_id))
                        update_listeners()
                    }
                }
            }
            if (data.dataType === 'Text') {
                try {
                    console.log(data.payload)
                } catch (err) {
                    console.log('This error shouldn\'t occur') // FIXME:
                }

            }
            //console.log(data) 
        })
    }
}

// DOM manipulation starts here delete if not like this
// click to copy for [my_peer_id]
document.getElementById('my_peer_id').addEventListener('click', () => {
    navigator.clipboard.writeText(document.getElementById('my_peer_id').innerText.substring(11));
})