var ModMonitor = (function () {

    /**
     * 获取url中的参数
     * @param str url参数
     * @param key url参数名
     * @returns {*}
     */
     function getUrlParams(str,key) {
        var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");
        var r =str.match(reg);
        if (r != null) return r[2];
        return null;
    }

    function _buildbd (bdArray) {
        var result = '';
        for (var i = 0; i < bdArray.length; i++) {
            result += bdArray[i];
            if (bdArray.length > 1 && i != bdArray.length - 1) {
                result += '<br><br>';
            }
        }
        return result;
    }

    function _buildMixCommon (mixCommonArray) {
        var result = '';
        for (var i = 0; i < mixCommonArray.length; i++) {
            result += mixCommonArray[i];
            if (mixCommonArray.length > 1 && i != mixCommonArray.length - 1) {
                result += '<br><br>';
            }
        }
        return result;
    }


    function _buildduowan (duowanArray) {
        var result = '';
        for (var i = 0; i < duowanArray.length; i++) {
            result += duowanArray[i];
            if (duowanArray.length > 1 && i != duowanArray.length - 1) {
                result += '<br><br>';
            }
        }
        return result;
    }

    function _buildya (yArray) {
        var result = '',eid,eid_desc,pro;
        for (var i = 0; i < yArray.length; i++) {
            console.log(yArray[i]);
            eid = getUrlParams(decodeURIComponent(decodeURIComponent(yArray[i])),'eid');
            eid_desc = getUrlParams(decodeURIComponent(decodeURIComponent(yArray[i])),'eid_desc');
            pro = getUrlParams(decodeURIComponent(decodeURIComponent(yArray[i])),'pro');
            result += 'eid：'+eid+'，eid_desc：'+eid_desc+'，pro：'+pro;
            if (yArray.length > 1 && i != yArray.length - 1) {
                result += '<br><br>';
            }
        }
        return result;
    }

    function init (monitorScripts) {

        if (monitorScripts) {
            $('#monitor-info').addClass('hide');
            $('#monitor-table').removeClass('hide');

            if (monitorScripts.mixCommon.length > 0) {
                $('#common-info').find('td').html('').html(_buildMixCommon(monitorScripts.mixCommon));
            } else {
                $('#common-info').addClass('warning').find('td').text('-没有-');
            }

            if (monitorScripts.duowan.length > 0) {
                $('#duowan-info').find('td').html('').html(_buildduowan(monitorScripts.duowan));
            } else {
                $('#duowan-info').addClass('warning').find('td').text('-没有-');
            }

            if (monitorScripts.bd.length > 0) {
                var bd_id = _buildbd(monitorScripts.bd).split('?')[1];
                var proname;
                switch (bd_id){

                    case "15a313ada17177640b9dbaaf3c988471":proname ="龙界争霸" ;break;
                    case "04eba9ce37595a2bc196f192a9130f51":proname = "魔幻英雄";break;
                    case "0e78a45ead8a8b562320f3376d4e2ada":proname = "端游活动中心";break;
                    case "6181c20c1c5f72b37d613523e6f85417":proname = "端游多玩活动中心";break;
                    case "3881d5e47d5794b8a0a71937d6c60360":proname = "灵欲";break;
                    case "efc66658f8ae91ba4c373f11093845e8":proname = "95";break;
                    case "3d77ea18bb78ad0e1d55f3a30a2cef41":proname = "美人三国";break;
                    case "56d430fe879e10ef563335102a753177":proname = "赤壁之战";break;
                    case "e9786d3299345bf57782af877f3e69bb":proname = "FF14";break;
                    case "98e729c0e1c8207856f01ca7888ce331":proname = "歪歪江湖";break;
                    case "cc2fa0b1380f04b1a0d9a3ce4b41b61c":proname = "战西游";break;
                    case "e2434d26510313e83b26637c7cabf3bd":proname = "5153";break;
                    case "cac5620b6fc970153d8602f7a9b31d03":proname = "古剑奇谭";break;
                    case "14ca2d2e028c7279d732c4631f708646":proname = "风云无双";break;
                    case "4e93bb11ac6dc944d2a76b963e31e049":proname = "风云";break;
                    case "d31c46f1b8a6cb58a9e6991a6851217d":proname = "端游平台";break;
                    case "ee0e64433b1fb9ca8ee4a66138ebde9a":proname = "盖世豪侠";break;
                    case "4d2822398f7bc7463056f5e9d6c6a685":proname = "天衍录";break;
                    case "2b7616ad792941a592f790a22d7e8404":proname = "星主播";break;
                    case "9fb71726843792b1cba806176cecfe38":proname = "虎牙视频";break;
                    default :proname="无对应产品名";break;
                }
                $('#baidu-info').find('td').html('').html(_buildbd(monitorScripts.bd)+"<br>百度统计产品："+proname);
            } else {
                $('#baidu-info').addClass('warning').find('td').text('-没有-');
            }

            if (monitorScripts.ya.length > 0) {
                $('#ya-info').find('td').html('').html(_buildya(monitorScripts.ya));
            } else {
                $('#ya-info').addClass('warning').find('td').text('-没有-');
            }
        } else {
            return false;
        }


    }

    return {
        init: init
    }

})();