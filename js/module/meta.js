var ModMeta = (function () {

    // 判断 meta 信息的

    function build (data) {

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
                (content === '') ? result = '<tr class="warning">' : result = '<tr>';


                // content 填空
                if (!content) {
                    content = '-空缺-';
                }

                if(i!='front-end'){
                    content = '<td>' + content + '</td>';
                }else{
                    switch (content.toLowerCase()){
                        case 'mrf':content = "方阳";break;
                        case 'qadir':content = "杜强";break;
                        case 'somei':content = "方秀梅";break;
                        case 'zzy':content = "周宗裕";break;
                        case 'lhf':content = "林海峰";break;
                        case 'cc':content = "陈超";break;
                        case 'wz':content = "夏玮泽";break;
                        case 'cqh':content = "陈巧华";break;
                        case 'xgc':content = "夏广成";break;
                        case 'zx':content = "赵雪";break;
                        case 'xiaot':content = "庞茂松";break;
                        default :break;
                    }
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