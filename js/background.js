// Use a global object to maintain images per tab.

let allImages = {};
let allMonitorScripts = {};


const request = (details) => {
  const header = details.responseHeaders.find(h => h.name.toLowerCase() === 'content-length');
  const tabId = details.tabId;
  // 初始化特定标签页的图像数组
  if (!allImages[tabId]) {
    allImages[tabId] = [];
  }
  if (!allMonitorScripts[tabId]) {
    allMonitorScripts[tabId] = {};
    allMonitorScripts[tabId].ya = [];
  }
  // Only process image requests with content-length headers
  if (header && details.type == 'image') {
    if (header.value > 0) {
      allImages[tabId].push({
        url: details.url,
        size: header.value
      });
    } else if (/ylog.huya.com/g.test(details.url)) {
      allMonitorScripts[tabId].ya.push(details);
    }

  }
}
chrome.webRequest.onCompleted.addListener(
  request,
  { urls: ['<all_urls>'] },
  ['responseHeaders']
);


// OR Clean up when a tab is updated and navigated to a new URL
chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  console.log('changeInfo: ', changeInfo.status);

  if (changeInfo.status === 'loading') {
    allImages[tabId] = [];
    allMonitorScripts[tabId] = { ya: [] };
    chrome.webRequest.onCompleted.addListener(
      request,
      { urls: ['<all_urls>'] },
      ['responseHeaders']
    );
  }
  if (changeInfo.status === 'complete') {
    console.log('加载完毕，开始传递数据')
    chrome.tabs.sendMessage(tabId, {
      "scripsimg": allImages[tabId],
      "monitorscript": allMonitorScripts[tabId], tabId: tabId
    });
  }
});