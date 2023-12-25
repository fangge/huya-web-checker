//chrome.runtime.sendMessage('Hello', function (response) {
//    document.querySelector('#msg').innerText = response;
//});
function toUtf8(str) {
    var out, i, len, c;
    out = "";
    len = str.length;
    for(i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
        } else {
            out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
        }
    }
    return out;
}
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

    var currentTab = tabs[0];

    $("#qrcode-wrap").qrcode({
        width: 200, //宽度
        height:200, //高度
        text:currentTab.url
    });
    //if (!/(yy.com|duowan.com|5153.com)/ig.test(currentTab.url)) {
    //    $('body').addClass('disabled').text('此插件只支持欢聚站点...');
    //    return false;
    //}

    //下载所有图片
    $('#downImgAll').bind('click',function(){
        chrome.tabs.executeScript(tabs.id, {file: 'js/module/downimg.js'}, function(results){
            if (results && results[0] && results[0].length){
                results[0].forEach(function(url) {
                    chrome.downloads.download({
                        url: url,
                        conflictAction: 'uniquify',
                        saveAs: false
                    });
                });
            }
        });
    })

    main(currentTab.id);


    $('.btn-refresh').on('click', function () {
        chrome.tabs.reload({bypassCache:true});
    });


    // 监听消息
    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            // 来自 content script
            if (typeof request === 'object') {
                $('#meta-info').addClass('hide');
                $('#meta-table').removeClass('hide').find('tbody').html(ModMeta.build(request));

            // 来自 background
            } else if (request === 'bg') {
                main(currentTab.id);
            } else {
                return false;
            }
        }
    );
    chrome.tabs.executeScript(null, {file: "js/content_script.js"});

});

function main (tabId) {

    var BGPage = chrome.extension.getBackgroundPage();
    console.log('BGPage: ', BGPage);
    var images = BGPage.allImages[tabId];
    // var monitorScripts = BGPage.allMonitorScripts[tabId];
    ModImage.init(images);
    // ModMonitor.init(monitorScripts);
}