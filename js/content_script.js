//chrome.runtime.onMessage.addListener(
//    function (request, sender, sendResponse) {
//        if (request === 'Hello') {
//            alert('hello');
//            sendResponse('world');
//        }
//    }
//);

var msg = {};

var doc = document.documentElement;

var title = doc.getElementsByTagName('title')[0].innerText;

msg['title'] = title;

var META = [
    'keywords',
    'description',
    'front-end'
];

META.forEach(function (e, i, a) {
    msg[e] = '';
});

var metas = doc.getElementsByTagName('meta');

[].forEach.call(metas, function (e, i, a) {
    //if (element.name === 'front-end technicist') {
    //    msg = '123';
    //}
    if (META.indexOf(e.name.toLocaleLowerCase()) !== -1) {
        msg[e.name.toLocaleLowerCase()] = e.content;
    }
});


//for (var idx in metas) {
//    var m = metas[idx];
//    if (m.name === 'keywords') {
//        break;
//    }
//}

//var imageEntries = window.performance.getEntries().filter(function (e) {
//    return /(\.jpg|\.png)\?*\b/.test(e.name);
//});
//
//var images = [];

//[].forEach.call(imageEntries, function (e, i, a) {
//
//    var imageItem = {};
//    imageItem.url =
//
//
//});
//
//console.log(msg);
//console.log(images);

chrome.runtime.sendMessage(msg, function (response) {
    //alert('send!');
});