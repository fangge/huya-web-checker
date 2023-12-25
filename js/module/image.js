var ModImage = (function () {

    function _build(images) {
        var imagesOverSize = [];
        var imagesInfo = '';

        [].forEach.call(images, function (e, i, a) {
            console.log('e: ', e);
            var result = _checkImage(e);
            if (result.isOverSize) {
                imagesOverSize.push(result);
            }
        });

        if (imagesOverSize.length === 0) {
            return '<tr class="success">' +
                '<td colspan="6">' +
                '<p>太棒了，没有超标图片！</p>' +
                '</td>' +
                '</tr>';
        }

        for (var i = 0; i < imagesOverSize.length; i++) {
            imagesInfo += '<tr class="warning">' +
                '<td>' +
                '<a href="' + imagesOverSize[i].url + '" target="_blank"><img alt="' + imagesOverSize[i].url + '" src="' + imagesOverSize[i].url + '"></a>' +
                '</td>' +
                '<td>' +
                imagesOverSize[i].url.match(/(jpg|png)/ig)[0] +
                '</td>' +
                '<td>' +
                imagesOverSize[i].size + ' Kb' +
                '</td>' +
                '<td>' +
                imagesOverSize[i].maxSize + ' Kb' +
                '</td>' +
                '<td>' +
                imagesOverSize[i].width + 'px' +
                '</td>' +
                '<td>' +
                imagesOverSize[i].height + 'px' +
                '</td>' +
                '</tr>';
        }

        return imagesInfo;
    }

    function getCompressedImageSize(apiKey, imageUrl, callback) {
        // 使用fetch API发送请求
        fetch('https://api.tinify.com/shrink', {
            method: 'POST',
            body: imageUrl,
            headers: new Headers({
                'Authorization': 'Basic ' + btoa('api:' + apiKey)
            })
        })
            .then(response => {
                if (response.ok) return response.json();
                throw new Error('Compression failed: ' + response.statusText);
            })
            .then(data => {
                if (data && data.output && data.output.size) {
                    callback(null, data.output.size); // Tinypng返回的是压缩后文件的大小
                } else {
                    throw new Error('Invalid response from API');
                }
            })
            .catch(error => callback(error));
    }

    function _checkImage(image) {
        fetch(image.url)
            .then(response => response.blob()) // 获取图像blob数据
            .then(blob => getCompressedImageSize('2Pwl40v6kcDgWdfcjCQtYSSFZXbS9S1e', blob, (err, compressedSize) => {
                if (err) {
                    console.error(err);
                    return;
                }

                const size = Number(image.size); // 假定传入的image对象有size属性

                const isOverSize = (size - compressedSize) > 1024 * 5; // 例如：超过5KB认为图片过大
                const info = {
                    url: image.url,
                    originalSize: size,
                    compressedSize: compressedSize,
                    isOverSize,
                    width: image.width,
                    height: image.height
                };

                return info
            }))
            .catch(error => {
                console.error(error);
            });
    }
    function init(images) {
        if (images) {
            $('#image-info').addClass('hide');
            $('#image-table').removeClass('hide').find('tbody').html(_build(images));
        } else {
            return false;
        }

    }

    return {
        init: init
    }

})();