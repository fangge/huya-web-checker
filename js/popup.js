
function getCurrentTab() {
    return new Promise((resolve) => {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            resolve(tabs[0]);
        });
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    let currentTab = await getCurrentTab();


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


    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        console.log('request: ', request);

        if (typeof request === 'object' && request.title) {
            $('#meta-info').addClass('hide');
            $('#meta-table').removeClass('hide').find('tbody').html(ModMeta.build(request));
        }
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
            console.log('scripsimg: ', scripsimg);
            ModImage.init(scripsimg);

            ModMonitor.init(request.monitorScripts);
            // chrome.runtime.sendMessage({ images: allImages });
        }
    }
    );
})