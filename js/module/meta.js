var ModMeta = (function () {

    // 判断 meta 信息的

    function build(data) {

        var rows = '';

        for (var i in data) {

            var row = '',
                result = '',
                name = '',
                content = '';

            if (data.hasOwnProperty(i)) {
                name = i;
                content = data[i];

                // 判断是否测试通过
                result = '<tr>';
                


                // content 填空
                if (!content) {
                    content = '-空缺-';
                } else {
                    content = '<td>' + content + '</td>';
                }



                name = '<th>' + name + '</th>';

            }

            row = result + name + content + '</tr>';
            rows += row;
        }

        return rows;
    }




    return {
        build: build
    }
})();