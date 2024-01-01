// Use a global object to maintain images per tab
let allImages = {};
let allMonitorScripts = {};

// Function to listen for completed web requests
const request = (details) => {
    const header = details.responseHeaders.find(h => h.name.toLowerCase() === 'content-length');
    const tabId = details.tabId;

    if (!allImages[tabId]) allImages[tabId] = [];
    if (!allMonitorScripts[tabId]) allMonitorScripts[tabId] = { ya: [] };

    if (header && details.type === 'image') {
        if (header.value > 0) {
            allImages[tabId].push({ url: details.url, size: header.value });
        } else if (/ylog.huya.com/g.test(details.url)) {
            allMonitorScripts[tabId].ya.push(details);
        }
    }
};

// Add listener for web request
chrome.webRequest.onCompleted.addListener(request, { urls: ["*://*.huya.com/*", "*://*.msstatic.com/*"] }, ['responseHeaders']);

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('message: ', message);
    if (sender.tab && sender.tab.id) {
        if (message.title || message.metas) {
            // Handling messages with page data here...
        } else if (message.type === 'PAGE_READY') {
            // When page is ready, send the data to content script
            sendResponse({
                action: 'send_data',
                scripsimg: allImages[sender.tab.id],
                monitorscript: allMonitorScripts[sender.tab.id]
            });
        }
    }
    return true; // Indicates an asynchronous response
});

// Clean up when a tab is updated or closed
chrome.tabs.onRemoved.addListener((tabId) => delete allImages[tabId]);