var ModImage = (function () {

    function _build (images) {
        var imagesOverSize = [];
        var imagesInfo = '';

        [].forEach.call(images, function (e, i, a) {
            var result = _checkImage(e);
            if (result.isOverSize) {
                imagesOverSize.push(result);
            }
        });

        if (imagesOverSize.length === 0) {
            return '<tr class="success">' +
                '<td colspan="6">' +
                '<p>太棒了，没有超标图片！</p>' +
                '</td>'+
                '</tr>';
        }

        for (var i = 0; i < imagesOverSize.length; i++) {
            imagesInfo += '<tr class="warning">' +
            '<td>' +
            '<a href="'+ imagesOverSize[i].url +'" target="_blank"><img alt="' + imagesOverSize[i].url + '" src="'+ imagesOverSize[i].url +'"></a>' +
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

    function _checkImage (image) {
        var w = image.width;
        var h = image.height;
        var size = Number(image.size);

        //校验图片是否符合标准
        var pSize = w * h;
        var scale = 1;

        if(pSize <= 2074){
            scale = 1.187;
        }
        else if(pSize <= 5824){
            scale = 0.856;
        }
        else if(pSize <= 8008){
            scale = 0.631;
        }
        else if(pSize <= 13515){
            scale = 0.725;
        }
        else if(pSize <= 24990){
            scale = 0.793;
        }
        else if(pSize <= 42180){
            scale = 0.731;
        }
        else if(pSize <= 82214){
            scale = 0.525;
        }
        else{
            scale = 0.605;
        }

        var stSize = pSize * scale;

        var ret = {
            url: image.url,
            size : (size / 1024).toFixed(2),
            maxSize : (stSize / 1024).toFixed(2),
            width : w,
            height : h,
            isOverSize : false
        };


        if (size - stSize > 5 * 1024 && (size > 2 * stSize || size - stSize > 50 * 1024)) {

            ret.isOverSize = true;
        }

        return ret;
    }

    function init (images) {
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