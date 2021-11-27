# Behavior To Fix

# 1 ==PRIORITY:VERY_LOW==
#### Current Behavior

- if [A]-[B] are connected and [C] wants to connect then [C] has to send a connect request(by obtaining their PeerID) to either [A] or [B]. then all three will be connected and be able to send messages each other [A]-[B]-[C]. Message broadcasted from one will be sent to all others.
But if [A] tried to get [C]'s peerID and connect to [C]. then Connection will look like [A]-[C] and [A]-[B]. In this, there is no communication b/w [B] and [C].

#### Required Behavior

- if [A]-[B] are connected and then [C] wants to connect, then [A] and [B] should be able to get [C]'s PeerID and request to connect. result should be [A]-[B]-[C].