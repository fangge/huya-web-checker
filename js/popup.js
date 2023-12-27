function getCurrentTab() {
    return new Promise((resolve) => {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            resolve(tabs[0]);
        });
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    let currentTab = await getCurrentTab();

    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            console.log('popup接收到的数据: ', request);
            if (typeof request === 'object') {
                $('#meta-info').addClass('hide');
                $('#meta-table').removeClass('hide').find('tbody').html(ModMeta.build(request));
            }
            if (request.images) {
                ModImage.init(request.images);
            }
        })

    // Setting up QR Code for the current tab URL
    $("#qrcode-wrap").qrcode({
        width: 200,
        height: 200,
        text: currentTab.url
    });
    // Set up refresh button event listener
    document.querySelector('.btn-refresh').addEventListener('click', () => {
        chrome.tabs.reload(currentTab.id, { bypassCache: true });

    });

    // Inject content script when the popup is opened, if not already injected.
    chrome.scripting.executeScript({
        target: { tabId: currentTab.id },
        files: ["js/content_script.js"]
    });


})
// function main (tabId) {

//     var BGPage = chrome.extension.getBackgroundPage();
//     var images = BGPage.allImages[tabId];
//     var monitorScripts = BGPage.allMonitorScripts[tabId];
//     ModImage.init(images);
//     ModMonitor.init(monitorScripts);
// }