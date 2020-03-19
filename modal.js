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
};
//Modal

// 发布订阅模式

var emitter = {   
    ret: {},
    //注册事件
    on: function (event, fn) {

        // console.log(this.ret)
        if (typeof this.ret[event] === 'undefined') {
            this.ret[event] = [];
            this.ret[event].push(fn);
        }else {
            this.ret[event].push(fn);
        }
       
        return this.ret
    },
    //解绑事件
    off: function (event, fn) { },
    //触发事件
    emit: function (event) {

        if (this.ret[event]) {
            this.ret[event].forEach(fn => {
                fn.apply(this)
            });
         
        }
     
    },

}


var template = `
    <div class="m-modal">
    
        <div class="modal_wrap">
            <div class="modal_head">标题</div>
            <div class="modal_body"></div>
            <div class="modal_foot">
                <a href="#" class="confirm">确认</a>
                <a href="#" class="cancel">取消</a>
            </div>
        </div>
   
    </div>
    `
function Modal(options) {
    options = options || {};
    this.container = this._layout.cloneNode(true);
    this.body = this.container.querySelector('.modal_body');
    this.wrap = this.container.querySelector('.modal_wrap');
    if (options.content) this.setContent(options.content);
    extend(this, options);
    this._initEvent();

};

extend(Modal.prototype, {
    _layout: html2node(template),
    setContent: function (content) {
        if (!content) return;
        if (content.nodeType === 1) {
            this.body.innerHTML = 0;
            this.body.appendChild(content);
        }
        else {
            this.body.innerHTML = content;
        }
    },



    show: function (content) {
        if (content) this.setContent(content);
        document.body.appendChild(this.container);
    },

    hide: function () {
        var container = this.container;
        document.body.removeChild(container);
    },

    _initEvent: function () {
        this.container.querySelector('.confirm').addEventListener(
            'click', this._onConfirm.bind(this)
        )
        this.container.querySelector('.cancel').addEventListener(
            'click', this._onCancel.bind(this)
        )
    },

    _onConfirm: function () {
        this.emit('confirm');
        this.hide();
    },

    _onCancel: function () {
        this.emit('cancel');
        this.hide();
    }

});
extend(Modal.prototype, emitter)
