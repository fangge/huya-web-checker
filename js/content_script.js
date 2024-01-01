
let msg = {
    title: document.title
};
Array.from(document.getElementsByTagName('meta')).reduce((acc, meta) => {
    if (meta.name) msg[meta.name.toLowerCase()] = meta.content;
    return acc;
}, {})

chrome.runtime.sendMessage(msg);

window.addEventListener('load', () => {
    // Send the PAGE_READY message to background script
    chrome.runtime.sendMessage({ type: 'PAGE_READY' });
  });

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('Received message:', message);
    if (message.action === 'send_data') {
        console.log('Received image data:', message.scripsimg);
        console.log('Received monitor script data:', message.monitorscript);
        // Process the message data here...
    }
});