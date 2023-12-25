var images = [];
var allImages = {};
// var monitorScripts  = {};
// var allMonitorScripts = {};
// monitorScripts.mixCommon = [];
// monitorScripts.duowan = [];
// monitorScripts.bd = [];
// monitorScripts.ya = [];


function request (details) {

    var imageItem = {};

    // 查找响应头里的 'Content-Length' 属性来确定图片大小
    for (var i = 0; i < details.responseHeaders.length; i++) {
        if (details.responseHeaders[i].name === 'Content-Length') {
            if (/(\.jpg|\.png)\?*\b/ig.test(details.url)) {
                imageItem.url = details.url;
                imageItem.size = details.responseHeaders[i].value;
                images.push(imageItem);
                break;
            }
        }
    }

    // if (/((jquery\.min|Jcode)\.js)/.test(details.url)) {
    //     monitorScripts.mixCommon.push(details.url);
    // }
    // if (/feSdk/.test(details.url)) {
    //     monitorScripts.mixCommon.push(details.url);
    // }

    // if (/duowan\.js/.test(details.url)) {
    //     monitorScripts.duowan.push(details.url);
    // }

    // if (/(hm|h)\.js/.test(details.url)) {
    //     monitorScripts.bd.push(details.url);
    // }

    // if (/ylog\.hiido\.com/.test(details.url)) {
    //     monitorScripts.ya.push(details.url);
    // }

    return false;
    //++count;
    //console.log(count + ': ' + details.url);

    //var img = new Image();
    //img.src = details.url;
    //console.log(img);
    //console.log(details.url + ': ' + img.naturalHeight + ', ' + img.naturalWidth);

}


chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {

    //if (!/(yy.com|duowan.com|5153.com)/ig.test(tab.url)) {
    //    return false;
    //}

    if (changeInfo.status === 'loading') {

        console.log('start load');
        images = [];
        // monitorScripts.mixCommon = [];
        // monitorScripts.duowan = [];
        // monitorScripts.bd = [];
        // monitorScripts.ya = [];

        allImages = {};
        // allMonitorScripts = {};

        chrome.webRequest.onCompleted.addListener(
            request, {
                urls:["<all_urls>"],
                //types: ["image"],
                tabId: tabId
            }, ["responseHeaders"]);
    }

    if (changeInfo.status === 'complete') {

        console.log('completed');

        chrome.webRequest.onCompleted.removeListener(request);

        images.forEach(function (image) {
            var newImage = new Image();
            newImage.src = image.url;
            newImage.onload = function () {
                image.width = newImage.naturalWidth;
                image.height = newImage.naturalHeight;
                console.log('load!');
            };
        });

        allImages[tabId] = images;
        // allMonitorScripts[tabId] = monitorScripts;
        console.log(allImages);


        setTimeout(function () {
            chrome.runtime.sendMessage('bg', function (response) {
                console.log('send!');
            });
        }, 500);

    }
});

