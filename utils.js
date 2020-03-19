//将HTML转换为节点
    function html2node(str) {
        var container = document.createElement('div');
        container.innerHTML = str;
        return container.children[0];
    };
    
    //赋值属性
    //extend({a:1},{b:1,a:2}) ==>{a:1,b:1}
    function extend(o1, o2) {
        for (var i in o2) if (typeof o1[i] === 'undefined') {
            o1[i] = o2[i]
        }
        return o1;
    }


