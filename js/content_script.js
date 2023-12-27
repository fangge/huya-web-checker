chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log('request: ', request);
    if (request.scripsimg) {
        const scripsimg = request.scripsimg;
        console.log('images: ', images);
        scripsimg.forEach(function (image) {
            const newImage = new Image();
            newImage.src = image.url;
            newImage.onload = function () {
                image.width = newImage.naturalWidth;
                image.height = newImage.naturalHeight;
                console.log('load!');
            };
        });
        console.log('images: ', images);
        allImages[request.tabId] = scripsimg;
        chrome.runtime.sendMessage({ images: allImages });
    }
}
);

let msg = {};
let allImages = {};
let doc = document.documentElement;

let title = doc.getElementsByTagName('title')[0].innerText;

msg['title'] = title;


let metas = doc.getElementsByTagName('meta');

[].forEach.call(metas, function (e, i, a) {
    if (e.name) {
        msg[e.name.toLocaleLowerCase()] = e.content;
    }

});

chrome.runtime.sendMessage(msg, function (response) {
    //alert('send!');
    console.log('传输meta标签', meta)
});

// content_script.js
