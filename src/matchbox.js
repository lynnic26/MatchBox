define(function(require) {
    var Widget = require('Widget');
    function HoteLayer() {
        this.cfg = {
        	width: '430',
        	height: '200',
        	hasCloseBtn: true,
        	title: '提示',
        	hasMask: true,
            content: '确定删除图片吗？',
            text4Btn: '确定',
            text4CancelBtn: '取消'
        }   
    }
    HoteLayer.prototype = $.extend({}, new Widget(), {
        alert: function(cfg) {
            var CFG = $.extend(this.cfg, cfg);
            var box = $('<div class="hotel-layer"></div>');
            var head = $('<h1 class="layer-head">' + CFG.title + ' </h1>');
            var content = $('<div class="layer-body">' + CFG.content + '</div>');
            var footer = $('<div class="layer-footer"></div>');
            var closeBtn = $('<span class="layer-close"><span class="v"></span><span class="h"></span></span>');
            var confirmBtn = $('<a class="btn-confirm">确定</a>');
            if(CFG.bgImg) {    
                var bgImg = $('<img class="tip-pic">');
                bgImg.attr({
                    'src': CFG.bgImg
                })
                content.append(bgImg);
            }
            footer.append(confirmBtn);
            box.append(head).append(content).append(footer).append(closeBtn);
            box.appendTo('body'); 
            box.css({
                // 'height': CFG.height,
                'width': CFG.width
            });
            content.css({
                'height': CFG.height - 114 + 'px'
            });
            if(CFG.hasMask) {
                var mask = $('<div class="layer-mask"></div>');
                mask.appendTo('body');
            }
            closeBtn.on('click', function() {
                box.remove();
                mask.remove();
            });
            confirmBtn.on('click', function() {
                CFG.handler4Ok && CFG.handler4Ok();
                box.remove();
                mask.remove();
            });     
            return this;             
        },
        confirm: function(cfg) {
            var CFG = $.extend(this.cfg, cfg);
            var box = $('<div class="hotel-layer"></div>');
             var head = $('<h1 class="layer-head"><span>' + CFG.title + '</span></h1>');
            var content = $('<div class="layer-body"></div>');
            var footer = $('<div class="layer-footer"></div>');
            var closeBtn = $('<span class="layer-close"><span class="v"></span><span class="h"></span></span>');
            var confirmBtn = $('<a class="btn-confirm">' + CFG.text4Btn +'</a>');
            var cancelBtn =  $('<a class="btn-cancel">' + CFG.text4CancelBtn + '</a>');
            footer.append(confirmBtn).append(cancelBtn);
            if(CFG.layerClass) {
                box.addClass(CFG.layerClass);
            }
            if(CFG.content) {
                content.html(CFG.content);
            }
            if(CFG.htmlStr) {
                content.html(CFG.htmlStr);
            }
            
            box.append(head).append(content).append(closeBtn);
            if(!CFG.noFooter) {
                box.append(footer);
            }
            box.appendTo('body'); 
            box.css({
                'width': CFG.width
            });
            if(!CFG.htmlStr) {
                content.css({
                    'height': CFG.height - 114 + 'px'
                });
            }
            
            
            if(CFG.hasMask) {
                var mask = $('<div class="layer-mask"></div>');
                mask.appendTo('body');
            }
            closeBtn.on('click', function() {
                CFG.handle4Cancel && CFG.handle4Cancel();
                box.remove();
                mask.remove();
            });
            cancelBtn.on('click', function() {
                CFG.handle4Cancel && CFG.handle4Cancel();
                box.remove();
                mask.remove();
            });
            confirmBtn.on('click', function() {

                //若handle4Confirm返回false或者undefined，则关闭窗口
                //若handle4Confirm返回true，则不关闭窗口
                if(CFG.handle4Confirm && !CFG.handle4Confirm()) {   
                    box.remove();
                    mask.remove();
                }else if(!CFG.handle4Confirm) {
                    box.remove();
                    mask.remove(); 
                }
            });   
            return this;               
        },
        upload: function(cfg) {
            var CFG = $.extend(this.cfg, cfg);
            var box = $('<div class="hotel-layer uploading"></div>');
            var head = $('<h1 class="layer-head"><span>' + CFG.title + '</span></h1>');
            var content = $('<div class="layer-body"></div>');
            var footer = $('<div class="layer-footer"></div>');
            var closeBtn = $('<span class="layer-close"><span class="v"></span><span class="h"></span></span>');
            var confirmBtn = $('<a class="btn-confirm">' + CFG.text4Btn + '</a>');
            var totalNum = $('<span class="total-num">共是<span class="no">' + CFG.totalNum + '</span>张照片</span>');
            
            // for(var i = 0; i < CFG.totalNum; i ++ ) {
            //     var item = $('<div class="item"><img src="' + 'http://img4.tuniucdn.com/img/20140314/hotel_2016/upload-placeholder.jpg' + '"><div class="progressbar"><span class="bar"><span class="inner-bar"></span></span><span class="percentage">0%</span></div><div class="delete"></div></div>');
            //     content.append(item);
            // }
            if(CFG.content) {
                content.html(CFG.content);
            }
            if(CFG.htmlStr) {
                content.html(CFG.htmlStr);
            }

            footer.append(totalNum).append(confirmBtn);
            box.append(head).append(content).append(footer).append(closeBtn);
            box.appendTo('body');
            box.css({
                'width': CFG.width + 'px'
            });
            content.css({
                'max-height': CFG.height - 135 + 'px'
            });
            if(CFG.hasMask) {
                var mask = $('<div class="layer-mask"></div>');
                mask.appendTo('body');
            }
            closeBtn.on('click', function() {

                box.remove();
                mask.remove();
            });
            confirmBtn.on('click', function() {
                if(CFG.handle4Confirm && CFG.handle4Confirm()) {    
                    box.remove();
                    mask.remove(); 
                }
            });

            //删除操作
            content.find('.delete').on('click', function(e) {
                if(1 === content.find('.item').length) {
                    $(e.currentTarget).closest('.item').remove();
                    box.remove();
                    mask.remove();        
                }else {
                    $(e.currentTarget).closest('.item').remove();
                }
            }); 
            return this;                  
        },
        tips: function(cfg) {
            var CFG = $.extend(this.cfg, cfg);
            var box = $('<div class="hotel-layer tips"></div>');
            var content = $('<div class="layer-body"></div>');
            var mask = $('<div class="layer-mask"></div>');
            
            if(!CFG.content) {
               CFG.content = "请填写参数";
            }
            var show = $('<span class="tips-content">' + CFG.content + '</span>');
            if(CFG.type) {
                var icon = $('<i></i>');
                var iconClass = 'icon-' + CFG.type;
                icon.addClass('icon ' + iconClass);
                show.prepend(icon);
            }
            if(CFG.last) {
                var last = CFG.last;
            }else {
                var last = 3000;
            }
            content.append(show);
            mask.appendTo('body');
            content.appendTo(box);
            box.appendTo('body');

            setTimeout(function() {
                mask.remove();
                box.remove();
                CFG.callback && CFG.callback();
            }, last);
        }
    });
    return HoteLayer;
});

