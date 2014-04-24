/*global chrome*/
var extId = "pfmjnmeipppmcebplngmhfkleiinphhp";

// Just passing messages from the content page to
// the Zed app.
chrome.runtime.onConnect.addListener(function(port) {
    var zedPort = chrome.runtime.connect(extId);

    port.onMessage.addListener(function(msg) {
        zedPort.postMessage({
            text: msg.text
        });
    });
    zedPort.onMessage.addListener(function(msg) {
        port.postMessage(msg);
    });
    zedPort.onDisconnect.addListener(function() {
        port.disconnect();
    });
});
