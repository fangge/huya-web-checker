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