// import html2node from './utils.js'
// console.log(html2node)

function Slider(opt) {
    opt = opt || {};
    this.container = this._layout.cloneNode(true);
    this._imgArr = opt.imgArr;
    this.el = opt.el;
    this.time = opt.time || 2000;
    this.imgDivs = this.container.querySelectorAll('.m-slider div')
    this.activeImg = this.container.querySelector(".z-active img");
    this.preImg = this.container.querySelector(".z-pre img");
    this.nexImg = this.container.querySelector(".z-nex img");
    extend(this, opt);
    this._init();
}

var template = `
<div class="m-slider">
        <div class="z-pre">
        <img src="./image/6.jpg" alt="">
        </div>
        <div class="z-active">
            <img src="./image/1.jpg" alt="">
        </div>
        <div class="z-nex">
            <img src="./image/2.jpg" alt="">
        </div>
    </div>

`
extend(Slider.prototype, {
    _layout: html2node(template),
    _showImg: function(imgarray, index) {
        this.index = index || 0;
        if (this.index < 0) { this.index = 5 } else if (this.index > 5) { this.index = 0 }
        this.preIndex = this.index < 1 ? 5 : this.index - 1;
        this.nexIndex = this.index > 4 ? 0 : this.index + 1;
        this.activeImg.src = imgarray[this.index];
        this.preImg.src = imgarray[this.preIndex];
        this.nexImg.src = imgarray[this.nexIndex]
    },
    _init: function() {
        document.querySelector(this.el).appendChild(this.container);
        setInterval(() => {
            this._nex()
        }, this.time)
        this.container.querySelector('.z-pre').addEventListener(
            'click', this._pre.bind(this)
        );
        this.container.querySelector('.z-nex').addEventListener(
            'click', this._nex.bind(this)
        );
    },
    _nav: function(index) {
        this._showImg(this._imgArr, index);
    },
    _pre: function() {
        index = this.index - 1
        this._showImg(this._imgArr, index);
    },
    _nex: function() {
        index = this.index + 1;
        this._showImg(this._imgArr, index);
    },
})