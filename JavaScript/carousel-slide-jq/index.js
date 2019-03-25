//
function Carousel($ct) {
    this.init($ct);
    this.bind()
}

Carousel.prototype = {
    init: function ($ct) {
        this.$ct = $ct;
        this.$imgCt = this.$ct.find('.img-ct');
        this.$imgs = this.$ct.find('.img-ct >li');
        this.$preBtn = this.$ct.find('.pre');
        this.$nextBtn = this.$ct.find('.next');
        this.$bullets = this.$ct.find('.bullet li');

        this.imgWidth = this.$imgs.width();
        this.imgCount = this.$imgs.length;
        this.curPageIndex = 0;
        this.isAnimate = false;

        this.$imgCt.append(this.$imgs.first().clone());
        this.$imgCt.prepend(this.$imgs.last().clone());

        this.$imgCt.width((this.imgCount + 2) * this.imgWidth);

        this.$imgCt.css('left', -this.imgWidth);
    },
    bind: function () {
        let _this = this;
        this.$preBtn.on('click', function () {
            console.log('pred....');
            _this.playPre(1);
        });
        this.$nextBtn.on('click', function () {
            console.log('next...');
            _this.playNext(1);
        });
        this.$bullets.on('click', function () {
            console.log($(this).index())
            let index = $(this).index();
            if (_this.curPageIndex > index){
                _this.playPre(_this.curPageIndex - index);
            } else {
                _this.playNext(index - _this.curPageIndex);
            }
        })
    },
    playNext: function (len) {
        console.log('playNext');
        let _this = this;
        if (this.isAnimate) return;
        this.isAnimate = true;
        this.$imgCt.animate({
            left: '-='+ this.imgWidth * len
        }, function () {
            _this.curPageIndex += len;
            if (_this.curPageIndex === _this.imgCount) {
                _this.$imgCt.css('left', -_this.imgWidth);
                _this.curPageIndex = 0;
            }
            _this.setBullet();
            _this.isAnimate = false;
        })
    },
    playPre: function (len) {
        console.log('playPre');
        let _this = this;
        if (this.isAnimate) return;
        this.isAnimate = true;

        this.$imgCt.animate({
            left: '+=' + this.imgWidth * len
        }, function () {
            _this.curPageIndex -= len;
            if (_this.curPageIndex < 0){
                _this.$imgCt.css('left', -_this.imgWidth * _this.imgCount);
                _this.curPageIndex = _this.imgCount - 1;
            }
            _this.setBullet();
            _this.isAnimate = false;
        })
    },
    setBullet: function () {
        this.$bullets.eq(this.curPageIndex).addClass('active').siblings().removeClass('active');
    }
}

new Carousel($('.carousel'));